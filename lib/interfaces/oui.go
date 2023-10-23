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

type OUILogger struct {
	logger *zerolog.Logger
}

func (l *OUILogger) Success(s string, f ...interface{}) {
	l.logger.Info().Msgf(s, f...)
}

func (l *OUILogger) Info(s string, f ...interface{}) {
	l.logger.Info().Msgf(s, f...)
}

func (l *OUILogger) Warn(s string, f ...interface{}) {
	l.logger.Warn().Msgf(s, f...)
}

func (l *OUILogger) Error(s string, f ...interface{}) {
	l.logger.Error().Msgf(s, f...)
}

func (l *OUILogger) Err(err error, strs ...string) {
	msg := ""
	f := make([]interface{}, 0, len(strs))
	if len(strs) <= 1 {
		msg = strs[0]
	} else if len(strs) >= 2 {
		for _, s := range strs {
			f = append(f, s)
		}
	}
	l.logger.Err(err).Msgf(msg, f...)
}

func NewLogger(logger *zerolog.Logger) *OUILogger {
	l := &OUILogger{
		logger: logger,
	}
	return l
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
	ouidb, err := oui.New(psql, oui.WithVersion("web1"), oui.WithLogging(NewLogger(log)))
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
