package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog"
	"github.com/thatmattlove/oui-web/lib/interfaces"
)

func Populate(ctx *fiber.Ctx) error {
	log := zerolog.Ctx(ctx.Context())
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
	return ctx.Status(200).JSON(fiber.Map{"records": records})
}
