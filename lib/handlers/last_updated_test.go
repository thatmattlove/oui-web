package handlers_test

import (
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/thatmattlove/oui-web/lib"
	"github.com/thatmattlove/oui-web/lib/handlers"
	"github.com/thatmattlove/oui-web/lib/interfaces"
)

func Test_LastUpdated(t *testing.T) {
	interfaces.KEY_LAST_UPDATED = "test--last-updated"
	app := fiber.New()
	now := time.Now()
	est, err := time.LoadLocation("America/New_York")
	require.NoError(t, err)
	inLocal := now.In(est)
	env, err := lib.LoadEnv()
	require.NoError(t, err)
	t.Run("setup", func(t *testing.T) {
		handler := func(ctx *fiber.Ctx) error {
			kv, err := interfaces.NewKV(ctx, env.RedisURL)
			require.NoError(t, err)
			err = kv.SetLastUpdated(now)
			require.NoError(t, err)
			return ctx.SendStatus(http.StatusOK)
		}
		app.Get("/setup", handler)
		req := httptest.NewRequest(http.MethodGet, "/setup", nil)
		res, err := app.Test(req)
		require.NoError(t, err)
		assert.Equal(t, http.StatusOK, res.StatusCode)
	})
	t.Run("with tz", func(t *testing.T) {
		app.Get("/with-tz", handlers.LastUpdate)
		req := httptest.NewRequest(http.MethodGet, "/with-tz?tz=America/New_York", nil)
		res, err := app.Test(req)
		require.NoError(t, err)
		defer res.Body.Close()
		assert.Equal(t, http.StatusOK, res.StatusCode)
		var data *handlers.LastUpdateResponse
		body, err := io.ReadAll(res.Body)
		require.NoError(t, err)
		err = json.Unmarshal(body, &data)
		require.NoError(t, err)
		utc, err := time.Parse(time.RFC3339Nano, data.UTC)
		require.NoError(t, err)
		assert.True(t, now.Equal(utc))
		local, err := time.Parse(time.RFC3339Nano, data.Local)
		require.NoError(t, err)
		assert.True(t, inLocal.Equal(local))
	})
	t.Run("no tz", func(t *testing.T) {
		app.Get("/no-tz", handlers.LastUpdate)
		req := httptest.NewRequest(http.MethodGet, "/no-tz", nil)
		res, err := app.Test(req)
		require.NoError(t, err)
		defer res.Body.Close()
		assert.Equal(t, http.StatusOK, res.StatusCode)
		var data *handlers.LastUpdateResponse
		body, err := io.ReadAll(res.Body)
		require.NoError(t, err)
		err = json.Unmarshal(body, &data)
		require.NoError(t, err)
		utc, err := time.Parse(time.RFC3339Nano, data.UTC)
		require.NoError(t, err)
		assert.True(t, now.Equal(utc))
		local, err := time.Parse(time.RFC3339Nano, data.Local)
		require.NoError(t, err)
		assert.True(t, inLocal.Equal(local))
	})
}
