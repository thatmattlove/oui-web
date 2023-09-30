package handlers_test

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"net/url"
	"strings"
	"testing"

	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func Test_QueryString(t *testing.T) {
	handler := func(ctx *fiber.Ctx) error {
		q := ctx.Query("m")
		assert.Equal(t, "78507c21fc13,005056000000", q)
		ue, err := url.QueryUnescape(q)
		require.NoError(t, err)
		assert.Equal(t, "78507c21fc13,005056000000", ue)
		split := strings.Split(q, ",")
		assert.Equal(t, []string{"78507c21fc13", "005056000000"}, split)
		return ctx.SendStatus(http.StatusOK)
	}
	app := fiber.New()
	app.Get("/query", handler)
	q := url.QueryEscape("78507c21fc13,005056000000")
	req := httptest.NewRequest(http.MethodGet, fmt.Sprintf("/query?m=%s", q), nil)
	res, err := app.Test(req)
	require.NoError(t, err)
	assert.Equal(t, http.StatusOK, res.StatusCode)
}
