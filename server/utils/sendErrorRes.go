package utils

import (
	"net/http"
	"encoding/json"
)


func SendErrorResponse(w http.ResponseWriter, message string, statusCode int) {
    errorRes := map[string]string{
        "message": message,
    }
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(statusCode)
    json.NewEncoder(w).Encode(errorRes)
}
