package handlers

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog"
	"github.com/thatmattlove/oui-web/lib"
	"github.com/thatmattlove/oui-web/lib/interfaces"
)

type LastUpdateResponse struct {
	UTC   string `json:"utc"`
	Local string `json:"local"`
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
	kv, err := interfaces.NewKV(ctx, env.KV_URL)
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
	res := &LastUpdateResponse{
		UTC:   utc,
		Local: local,
	}
	return ctx.Status(200).JSON(res)
}
