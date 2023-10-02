package interfaces_test

import (
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/thatmattlove/oui-web/lib"
	"github.com/thatmattlove/oui-web/lib/interfaces"
)

var Env lib.Env

func init() {
	env, err := lib.LoadEnv()
	if err != nil {
		panic(err)
	}
	Env = env
}

func Test_KV(t *testing.T) {
	app := fiber.New()
	handler := func(ctx *fiber.Ctx) error {
		_, err := interfaces.NewKV(ctx, Env.RedisURL)
		require.NoError(t, err)
		return ctx.SendStatus(200)
	}
	app.Get("/", handler)
	req := httptest.NewRequest("GET", "/", nil)
	res, err := app.Test(req)
	require.NoError(t, err)
	assert.Equal(t, 200, res.StatusCode)
	t.Run("date", func(t *testing.T) {
		date := time.Now()
		t.Run("set", func(t *testing.T) {
			handler := func(ctx *fiber.Ctx) error {
				kv, err := interfaces.NewKV(ctx, Env.RedisURL)
				require.NoError(t, err)
				err = kv.SetLastUpdated(date)
				require.NoError(t, err)
				return ctx.SendStatus(200)
			}
			app.Get("/set-date", handler)
			req := httptest.NewRequest("GET", "/set-date", nil)
			res, err := app.Test(req)
			require.NoError(t, err)
			assert.Equal(t, 200, res.StatusCode)
		})
		t.Run("get", func(t *testing.T) {
			handler := func(ctx *fiber.Ctx) error {
				kv, err := interfaces.NewKV(ctx, Env.RedisURL)
				require.NoError(t, err)
				reqDate, err := kv.GetLastUpdated()
				require.NoError(t, err)
				assert.True(t, date.Equal(reqDate))
				return ctx.SendStatus(200)
			}
			app.Get("get-date", handler)
			req := httptest.NewRequest("GET", "/get-date", nil)
			res, err := app.Test(req)
			require.NoError(t, err)
			assert.Equal(t, 200, res.StatusCode)
		})
	})
}
