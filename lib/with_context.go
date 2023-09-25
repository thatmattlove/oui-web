package lib

import (
	"context"

	"github.com/gofiber/fiber/v2"
)

func WithContext(handler fiber.Handler, bg context.Context) fiber.Handler {
	return func(c *fiber.Ctx) error {
		c.SetUserContext(bg)
		return handler(c)
	}
}
