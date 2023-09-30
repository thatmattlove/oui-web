package lib

import (
	"net/url"
	"regexp"
	"strings"
)

var disallowed = regexp.MustCompile(`(?im)[^0-9a-f]`)
var allowed = regexp.MustCompile(`(?im)[0-9a-f]+`)

func Sanitize(query string) ([]string, error) {
	query, err := url.QueryUnescape(query)
	if err != nil {
		return nil, err
	}
	parts := strings.Split(query, ",")
	outParts := make([]string, 0, len(parts))
	for _, part := range parts {
		part = disallowed.ReplaceAllString(part, "")
		part = strings.TrimSpace(part)
		part = strings.ToLower(part)
		if allowed.MatchString(part) {
			outParts = append(outParts, part)
		}
	}
	return outParts, nil
}
