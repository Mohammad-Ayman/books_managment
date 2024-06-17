package controllers

import (
    "bytes"
    "encoding/json"
    "net/http"
    "net/http/httptest"
    "testing"
)

type Request struct {
    URL       string `json:"url"`
    Operation string `json:"operation"`
}

type Response struct {
    ProcessedURL string `json:"processed_url"`
}

type ErrorResponse struct {
    Message string `json:"message"`
}

func TestHandleCanonicalRedirect(t *testing.T) {
    tests := []struct {
        name       string
        request    Request
        want       string
        statusCode int
    }{
        {
            name: "Canonical URL",
            request: Request{
                URL:       "https://BYFOOD.com/food-EXPeriences?query=abc/",
                Operation: "canonical",
            },
            want:       "https://BYFOOD.com/food-EXPeriences",
            statusCode: http.StatusOK,
        },
        {
            name: "Redirect URL",
            request: Request{
                URL:       "https://BYFOOD.com/food-EXPeriences",
                Operation: "redirect",
            },
            want:       "https://www.byfood.com/food-experiences",
            statusCode: http.StatusOK,
        },
        {
            name: "All operations",
            request: Request{
                URL:       "https://BYFOOD.com/food-EXPeriences?query=abc/",
                Operation: "all",
            },
            want:       "https://www.byfood.com/food-experiences",
            statusCode: http.StatusOK,
        },
        {
            name: "Invalid Operation",
            request: Request{
                URL:       "https://BYFOOD.com/food-EXPeriences?query=abc/",
                Operation: "invalid",
            },
            want:       "Operation must be canonical, redirect or all",
            statusCode: http.StatusBadRequest,
        },
        {
            name: "Empty URL",
            request: Request{
                URL:       "",
                Operation: "canonical",
            },
            want:       "Invalid URL data",
            statusCode: http.StatusBadRequest,
        },
        {
            name: "Empty Operation",
            request: Request{
                URL:       "https://BYFOOD.com/food-EXPeriences?query=abc/",
                Operation: "",
            },
            want:       "Invalid operation data",
            statusCode: http.StatusBadRequest,
        },
        {
            name: "URL with trailing slash",
            request: Request{
                URL:       "https://BYFOOD.com/food-EXPeriences/",
                Operation: "canonical",
            },
            want:       "https://BYFOOD.com/food-EXPeriences",
            statusCode: http.StatusOK,
        },
        {
            name: "URL with mixed case and multiple query parameters",
            request: Request{
                URL:       "https://BYFOOD.com/Food-Experiences?Query=abc&another=param",
                Operation: "canonical",
            },
            want:       "https://BYFOOD.com/Food-Experiences",
            statusCode: http.StatusOK,
        },
        {
            name: "URL with fragment",
            request: Request{
                URL:       "https://BYFOOD.com/food-EXPeriences#section",
                Operation: "canonical",
            },
            want:       "https://BYFOOD.com/food-EXPeriences",
            statusCode: http.StatusOK,
        },
        {
            name: "Canonical operation with already cleaned URL",
            request: Request{
                URL:       "https://BYFOOD.com/food-experiences",
                Operation: "canonical",
            },
            want:       "https://BYFOOD.com/food-experiences",
            statusCode: http.StatusOK,
        },
        {
            name: "Redirect operation with non-www domain",
            request: Request{
                URL:       "https://byfood.com/food-experiences",
                Operation: "redirect",
            },
            want:       "https://www.byfood.com/food-experiences",
            statusCode: http.StatusOK,
        },
    }
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            reqBody, err := json.Marshal(tt.request)
            if err != nil {
                t.Fatalf("could not marshal request: %v", err)
            }

            req := httptest.NewRequest(http.MethodPost, "/process", bytes.NewBuffer(reqBody))
            req.Header.Set("Content-Type", "application/json")
            res := httptest.NewRecorder()

            HandleCanonicalRedirect(res, req)

            if res.Code != tt.statusCode {
                t.Errorf("expected status %v; got %v", tt.statusCode, res.Code)
            }

            if res.Code == http.StatusOK {
                var resp Response
                if err := json.NewDecoder(res.Body).Decode(&resp); err != nil {
                    t.Fatalf("could not decode response: %v", err)
                }

                if resp.ProcessedURL != tt.want {
                    t.Errorf("expected processed URL %v; got %v", tt.want, resp.ProcessedURL)
                }
            } else {
                var errResp ErrorResponse
                if err := json.NewDecoder(res.Body).Decode(&errResp); err != nil {
                    t.Fatalf("could not decode error response: %v", err)
                }

                if errResp.Message != tt.want {
                    t.Errorf("expected error message %v; got %v", tt.want, errResp.Message)
                }
            }
        })
    }
}
