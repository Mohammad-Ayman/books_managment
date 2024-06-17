package utils

import (
	"net/url"
)

func CanonicalUrl(urlString string) string {
	parsedURL, err := url.Parse(urlString)
	if err != nil {
		return urlString
	}

	// Remove query parameters
	parsedURL.RawQuery = ""

	// Handle URL with trailing slash
	if parsedURL.Path != "" && parsedURL.Path[len(parsedURL.Path)-1] == '/' {
		parsedURL.Path = parsedURL.Path[:len(parsedURL.Path)-1]
	}

	//Handle URL with fragment
	if parsedURL.Fragment != "" {
		parsedURL.Fragment = ""
	}

	return parsedURL.String()
}