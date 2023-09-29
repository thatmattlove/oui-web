package lib

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/keyauth"
)

func NewAuthenticator(expected string) func(*fiber.Ctx, string) (bool, error) {
	cb := func(c *fiber.Ctx, k string) (bool, error) {
		if k == expected {
			return true, nil
		}
		return false, keyauth.ErrMissingOrMalformedAPIKey
	}
	return cb
}
