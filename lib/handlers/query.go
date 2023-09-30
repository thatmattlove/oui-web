//lint:file-ignore ST1005 these are user-facing UI errors.
package handlers

import (
	"fmt"
	"sort"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog"
	"github.com/thatmattlove/go-macaddr"
	"github.com/thatmattlove/oui-web/lib"
	"github.com/thatmattlove/oui-web/lib/interfaces"
	"github.com/thatmattlove/oui/v2/oui"
)

type QueryResponse struct {
	Org              string `json:"org"`
	Prefix           string `json:"prefix"`
	Registry         string `json:"registry"`
	RegistryURL      string `json:"registryUrl"`
	PrefixLength     int    `json:"prefixLength"`
	PrefixRange      string `json:"prefixRange"`
	PrefixRangeStart string `json:"prefixRangeStart"`
	PrefixRangeStop  string `json:"prefixRangeStop"`
	OUI              string `json:"oui"`
}

func buildSingleResponse(matches []*oui.VendorDef) ([]QueryResponse, error) {
	results := make([]QueryResponse, 0, len(matches))
	for _, match := range matches {
		match := match
		_, prefix, err := macaddr.ParseMACPrefix(match.Prefix)
		if err != nil {
			return nil, err
		}
		firstMac := prefix.First()
		lastMac := prefix.Last()
		oui := firstMac.OUI(match.Length)
		start := strings.Trim(strings.ReplaceAll(firstMac.String(), oui, ""), ":")
		stop := strings.Trim(strings.ReplaceAll(lastMac.String(), oui, ""), ":")
		prefixRange := fmt.Sprintf("%s-%s", firstMac.String(), lastMac.String())
		registryURL := lib.RegistryURLMap[match.Registry]
		result := QueryResponse{
			Org:              match.Org,
			Prefix:           match.Prefix,
			Registry:         match.Registry,
			RegistryURL:      registryURL,
			PrefixLength:     match.Length,
			PrefixRange:      prefixRange,
			PrefixRangeStart: start,
			PrefixRangeStop:  stop,
			OUI:              oui,
		}
		results = append(results, result)
	}
	return results, nil
}

func getData(ctx *fiber.Ctx) string {
	contentType := strings.ToLower(ctx.Get("content-type"))
	if strings.Contains(contentType, "multipart/form-data") {
		return ctx.FormValue("search", "none")
	}
	return ctx.Query("m", "none")
}

func Query(ctx *fiber.Ctx) error {
	log := zerolog.Ctx(ctx.UserContext()).
		With().
		Str("request-uri", ctx.Request().URI().String()).
		Str("content-type", ctx.Get("content-type")).
		Logger()
	form, err := ctx.MultipartForm()
	if err != nil {
		log.Err(err).Msg("")
		return ctx.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	log.Info().Strs("search", form.Value["search"]).Msg("")
	query := getData(ctx)
	log = log.With().Str("query", query).Logger()
	if query == "none" {
		log.Error().Msg("empty query")
		return ctx.Status(400).JSON(fiber.Map{"error": "MAC address required"})
	}
	if len(query) < 6 {
		log.Error().Msg("query is shorter than 6 characters")
		return ctx.Status(400).JSON(fiber.Map{"error": "At least 6 characters are required."})
	}
	queries, err := lib.Sanitize(query)
	if err != nil {
		return ctx.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	log = log.With().Strs("sanitized-queries", queries).Logger()
	for _, q := range queries {
		if len(q) > 24 {
			log.Error().Str("q", q).Msg("query exceeds max length")
			return ctx.Status(400).JSON(fiber.Map{"error": fmt.Sprintf("EUI-64 is the maximum supported address length (%s).", q)})
		}
	}
	oui, err := interfaces.NewOUI(ctx)
	if err != nil {
		log.Err(err).Msg("failed to initialize OUI interface")
		return err
	}
	if len(queries) == 1 {
		matches, err := oui.OUI.Find(queries[0])
		if err != nil {
			log.Err(err).Msgf("failed to query for MAC '%s'", queries[0])
			return err
		}
		results, err := buildSingleResponse(matches)
		if err != nil {
			return err
		}
		return ctx.Status(200).JSON(results)
	}
	results := fiber.Map{}
	for _, q := range queries {
		matches, err := oui.OUI.Find(q)
		if err != nil {
			log.Err(err).Msgf("failed to query for MAC '%s'", query)
			return err
		}
		singleMatches, err := buildSingleResponse(matches)
		if err != nil {
			return err
		}
		sort.Slice(singleMatches, func(a, b int) bool {
			return singleMatches[a].PrefixLength < singleMatches[b].PrefixLength
		})
		match := singleMatches[0]
		results[match.OUI] = match
	}
	log.Info().Msg("completed query")
	return ctx.Status(200).JSON(results)
}
