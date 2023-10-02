package handlers

import (
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog"
	"github.com/thatmattlove/oui-web/lib"
	"github.com/thatmattlove/oui-web/lib/interfaces"
)

type LastUpdateResponse struct {
	UTC       string `json:"utc"`
	Local     string `json:"local"`
	NextUTC   string `json:"nextUtc"`
	NextLocal string `json:"nextLocal"`
}

func LastUpdate(ctx *fiber.Ctx) error {
	log := zerolog.Ctx(ctx.UserContext())
	tzStr := ctx.Query("tz")
	tz, err := time.LoadLocation(tzStr)
	if err != nil {
		log.Err(err).Msg("failed to parse timezone")
		return err
	}
	env, err := lib.LoadEnv()
	if err != nil {
		log.Err(err).Msg("failed to load environment variables")
		return err
	}
	kv, err := interfaces.NewKV(ctx, env.RedisURL)
	if err != nil {
		log.Err(err).Msg("failed to initialize KV")
		return err
	}
	date, err := kv.GetLastUpdated()
	if err != nil {
		log.Err(err).Msg("failed to retrieve updated date")
		return err
	}
	utc := date.UTC().Format(time.RFC3339Nano)
	local := date.In(tz).Format(time.RFC3339Nano)
	nextUpdate, err := kv.GetNextUpdate()
	if err != nil {
		log.Err(err).Msg("failed to retrieve next update time")
		return err
	}
	nextUTC := nextUpdate.UTC().Format(time.RFC3339Nano)
	nextLocal := nextUpdate.In(tz).Format(time.RFC3339Nano)
	res := &LastUpdateResponse{
		UTC:       utc,
		Local:     local,
		NextUTC:   nextUTC,
		NextLocal: nextLocal,
	}
	ttl := uint(time.Until(nextUpdate).Seconds())
	cacheValue := fmt.Sprintf("public, max-age=39600, s-maxage=39600, stale-while-revalidate=%d", ttl)
	ctx.Set("cache-control", cacheValue)
	ctx.Set("cdn-cache-control", cacheValue)
	ctx.Set("vercel-cdn-cache-control", cacheValue)
	return ctx.Status(200).JSON(res)
}
