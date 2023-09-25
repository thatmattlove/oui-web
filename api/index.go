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
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/hlog"
	"github.com/rs/zerolog/log"
	"github.com/thatmattlove/oui-web/lib"
	"github.com/thatmattlove/oui-web/lib/handlers"
)

func init() {
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr, TimeFormat: time.RFC3339})
}

func Handler(w http.ResponseWriter, r *http.Request) {
	hlog.FromRequest(r).Debug().Str("method", r.Method).Stringer("url", r.URL).Msg("")
	r.RequestURI = r.URL.String()
	handler().ServeHTTP(w, r)
}

func handler() http.HandlerFunc {
	ctx := log.Logger.WithContext(context.TODO())

	config := fiber.Config{
		AppName:      "oui",
		Network:      "tcp",
		ErrorHandler: lib.ErrorHandler,
	}

	app := fiber.New(config)
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

	app.Get("/api/query", lib.WithContext(handlers.Query, ctx))

	app.Post("/api/populate", lib.WithContext(handlers.Populate, ctx))

	return adaptor.FiberApp(app)
}
