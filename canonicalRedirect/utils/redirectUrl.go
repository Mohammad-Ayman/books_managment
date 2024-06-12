package utils

import (
	"net/url"
	"strings"
)

// RedirectURL ensures the domain is www.byfood.com and converts the entire URL to lowercase
func RedirectUrl(urlString string) string {
	parsedURL, err := url.Parse(urlString)
	if err != nil {
		return urlString
	}

	// Ensure the domain is www.byfood.com
	parsedURL.Host = "www.byfood.com"
	parsedURL.Scheme = "https"

	// Convert the entire URL to lowercase
	// The Host is already lowercase, so only Path and RawQuery need to be converted
	parsedURL.Path = strings.ToLower(parsedURL.Path)
	parsedURL.RawQuery = strings.ToLower(parsedURL.RawQuery)

	lowercaseURL := parsedURL.String()

	return lowercaseURL
}
