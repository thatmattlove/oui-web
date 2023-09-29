package lib

import (
	"errors"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/keyauth"
	"github.com/rs/zerolog"
)

// ErrorHandler processes and logs any errors returned by a route handler.
func ErrorHandler(ctx *fiber.Ctx, err error) error {
	log := zerolog.Ctx(ctx.UserContext())
	code := fiber.StatusInternalServerError
	message := err.Error()
	var e *fiber.Error
	if errors.As(err, &e) {
		// Get fiber error fields
		code = e.Code
		message = e.Message
	}
	if err == keyauth.ErrMissingOrMalformedAPIKey {
		// Authentication error
		headers := make(map[string]string)
		ctx.Request().Header.VisitAll(func(k []byte, v []byte) {
			headers[string(k)] = string(v)
		})
		log.Error().
			Str("method", ctx.Method()).
			Str("url", ctx.Request().URI().String()).
			Interface("headers", headers).
			Interface("query", ctx.Queries()).
			Msg("authentication failed")
		code = http.StatusUnauthorized
		message = "authentication failed"
	}
	return ctx.Status(code).JSON(fiber.Map{"error": message})
}
