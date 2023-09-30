package lib

import (
	"net/url"
	"regexp"
	"strings"
)

var disallowed = regexp.MustCompile(`(?im)[^0-9a-f]`)
var allowed = regexp.MustCompile(`(?im)[0-9a-f]+`)

var chars = []string{"\r\n", "\n\r", ",", "\n", "\r"}

func Sanitize(query string) ([]string, error) {
	query, err := url.QueryUnescape(query)
	if err != nil {
		return nil, err
	}
	parts := make([]string, 0)
	for _, char := range chars {
		if strings.Contains(query, char) {
			parts = strings.Split(query, char)
			break
		}
	}
	if len(parts) == 0 {
		parts = []string{query}
	}
	sanitized := make([]string, 0, len(parts))
	for _, part := range parts {
		part = disallowed.ReplaceAllString(part, "")
		part = strings.TrimSpace(part)
		part = strings.ToLower(part)
		if allowed.MatchString(part) {
			sanitized = append(sanitized, part)
		}
	}
	return sanitized, nil
}
