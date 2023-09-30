package lib_test

import (
	"net/url"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/thatmattlove/oui-web/lib"
)

func Test_Sanitize(t *testing.T) {
	t.Run("1", func(t *testing.T) {
		in := "78507c21fc13,005056000000"
		exp := []string{"78507c21fc13", "005056000000"}
		out, err := lib.Sanitize(in)
		require.NoError(t, err)
		assert.Equal(t, exp, out)
	})
	t.Run("2", func(t *testing.T) {
		in := "78:50:7c:21:fc:13,00:50:56:00:00:00"
		exp := []string{"78507c21fc13", "005056000000"}
		out, err := lib.Sanitize(in)
		require.NoError(t, err)
		assert.Equal(t, exp, out)
	})
	t.Run("3", func(t *testing.T) {
		in := url.QueryEscape("78:50:7c:21:fc:13,00:50:56:00:00:00")
		exp := []string{"78507c21fc13", "005056000000"}
		out, err := lib.Sanitize(in)
		require.NoError(t, err)
		assert.Equal(t, exp, out)
	})
	t.Run("4", func(t *testing.T) {
		in := "78:50:7c:21:fc:13"
		exp := []string{"78507c21fc13"}
		out, err := lib.Sanitize(in)
		require.NoError(t, err)
		assert.Equal(t, exp, out)
	})
	t.Run("5", func(t *testing.T) {
		in := "#78:5^0:gy:7C:2&1:fc:*13"
		exp := []string{"78507c21fc13"}
		out, err := lib.Sanitize(in)
		require.NoError(t, err)
		assert.Equal(t, exp, out)
	})
	t.Run("6", func(t *testing.T) {
		in := "#78:5^0:gy:7C:2&1:fc:*13%2C0$0:&50:5(6:00:00:@00"
		exp := []string{"78507c21fc13", "005056000000"}
		out, err := lib.Sanitize(in)
		require.NoError(t, err)
		assert.Equal(t, exp, out)
	})
	t.Run("7", func(t *testing.T) {
		in := "#78:5^0:gy:%7C:2&1:fc:*13%2C0$0:&5%0:5(6:00:00:@00"
		_, err := lib.Sanitize(in)
		assert.Error(t, err)
	})
}
