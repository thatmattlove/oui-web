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

func Query(ctx *fiber.Ctx) error {
	log := zerolog.Ctx(ctx.UserContext())
	query := ctx.Query("m", "none")
	log.Debug().Str("mac", query).Msg("")
	if query == "none" {
		return ctx.Status(400).JSON(fiber.Map{"error": "MAC address required"})
	}
	if len(query) < 6 {
		return ctx.Status(400).JSON(fiber.Map{"error": "At least 6 characters are required."})
	}
	queries := strings.Split(query, ",")
	for _, q := range queries {
		if len(q) > 16 {
			return ctx.Status(400).JSON(fiber.Map{"error": "EUI-64 is the maximum supported address length."})
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

	return ctx.Status(200).JSON(results)
}
