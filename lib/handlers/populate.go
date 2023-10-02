package handlers

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog"
	"github.com/thatmattlove/oui-web/lib"
	"github.com/thatmattlove/oui-web/lib/interfaces"
)

func Populate(ctx *fiber.Ctx) error {
	log := zerolog.Ctx(ctx.UserContext())
	oui, err := interfaces.NewOUI(ctx)
	if err != nil {
		log.Err(err).Msg("failed to initialize OUI interface")
		return err
	}
	records, err := oui.OUI.Populate()
	if err != nil {
		log.Err(err).Msg("failed to populate database")
		return err
	}
	updated := time.Now().UTC()
	env, err := lib.LoadEnv()
	if err != nil {
		log.Err(err).Msg("failed to load environment variables")
	} else {
		kv, err := interfaces.NewKV(ctx, env.RedisURL)
		if err != nil {
			log.Err(err).Msg("failed to initialize KV")
		} else {
			err := kv.SetLastUpdated(updated)
			if err != nil {
				log.Err(err).Msg("failed to set updated date")
			}
		}
	}
	return ctx.Status(200).JSON(fiber.Map{"records": records})
}
