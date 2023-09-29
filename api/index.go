package handler

import (
	"context"
	"net/http"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/adaptor"
	"github.com/gofiber/fiber/v2/middleware/cache"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/etag"
	"github.com/gofiber/fiber/v2/middleware/keyauth"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/hlog"
	"github.com/rs/zerolog/log"
	"github.com/thatmattlove/oui-web/lib"
	"github.com/thatmattlove/oui-web/lib/handlers"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	hlog.FromRequest(r).Debug().Str("method", r.Method).Stringer("url", r.URL).Msg("")
	r.RequestURI = r.URL.String()
	handler().ServeHTTP(w, r)
}

func handler() http.HandlerFunc {
	logger := log.Output(zerolog.ConsoleWriter{Out: os.Stderr, TimeFormat: time.RFC3339Nano})
	logger.Level(zerolog.DebugLevel)
	ctx := context.TODO()
	ctx = logger.WithContext(ctx)

	config := fiber.Config{
		AppName:      "oui",
		Network:      "tcp",
		ErrorHandler: lib.ErrorHandler,
	}

	app := fiber.New(config)

	app.Use(func(c *fiber.Ctx) error {
		c.SetUserContext(ctx)
		return c.Next()
	})

	app.Use(recover.New())
	app.Use(compress.New())
	app.Use(etag.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
	}))
	app.Use(cache.New(cache.Config{
		Expiration:   15 * time.Minute,
		CacheControl: true,
	}))

	env, err := lib.LoadEnv()
	if err != nil {
		panic(err)
	}

	app.Get("/api/query", handlers.Query)

	app.Post("/api/populate", keyauth.New(
		keyauth.Config{
			KeyLookup:    "header:Authorization",
			Validator:    lib.NewAuthenticator(env.PopulateKey),
			ErrorHandler: lib.ErrorHandler,
			// AuthScheme:   "",
		},
	), handlers.Populate)

	app.Get("/api/last-updated", handlers.LastUpdate)

	return adaptor.FiberApp(app)
}
