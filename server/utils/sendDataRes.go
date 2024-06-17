package utils

import (
    "net/http"
    "encoding/json"
)

func SendDataResponse(w http.ResponseWriter, data interface{}, statusCode int) {
    dataRes := map[string]interface{}{
        "data": data,
    }
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(statusCode)
    err := json.NewEncoder(w).Encode(dataRes)
    if err != nil {
        SendErrorResponse(w, "Error encoding response", http.StatusInternalServerError)
    }
}
