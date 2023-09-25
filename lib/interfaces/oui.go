package interfaces

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/rs/zerolog"
	"github.com/thatmattlove/oui/v2/oui"
)

type OUI struct {
	OUI *oui.OUIDB
	Ctx *fiber.Ctx
}

func NewOUI(ctx *fiber.Ctx) (*OUI, error) {
	log := zerolog.Ctx(ctx.Context())
	connectionString := os.Getenv("DATABASE_URL")
	if connectionString == "" {
		return nil, fmt.Errorf("missing 'DATABASE_URL' environment variable")
	}
	psql, err := oui.CreatePostgresOption(connectionString)
	if err != nil {
		log.Err(err).Msg("failed to initialize Postgres")
		return nil, err
	}
	ouidb, err := oui.New(psql, oui.WithVersion("web1"))
	if err != nil {
		log.Err(err).Msg("failed to initialize OUI backend")
		return nil, err
	}
	iface := &OUI{
		OUI: ouidb,
		Ctx: ctx,
	}
	return iface, nil
}
