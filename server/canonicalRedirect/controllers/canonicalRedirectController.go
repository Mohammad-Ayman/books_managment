package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/mohammad-ayman/books_managment/server/canonicalRedirect/services"
	"github.com/mohammad-ayman/books_managment/server/utils"
)


type Data struct {
    Operation string `json:"operation"`
    Url       string `json:"url"`
}

// HandleCanonicalRedirect handles the clean redirect
func HandleCanonicalRedirect(w http.ResponseWriter, r *http.Request) {

    var data Data
    err := json.NewDecoder(r.Body).Decode(&data)
    if err != nil || data.Operation == "" {
        utils.SendErrorResponse(w, "Invalid operation data", http.StatusBadRequest)
        return
    } else if data.Url == "" {
        utils.SendErrorResponse(w, "Invalid URL data", http.StatusBadRequest)
        return
    }

    processed_url := services.ProcessURL(data.Operation, data.Url)
    if processed_url == "" {
        utils.SendErrorResponse(w, "Operation must be canonical, redirect or all", http.StatusBadRequest)
        return
    }

    response := map[string]string{
        "processed_url": processed_url,
    }

	w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(200)
    err = json.NewEncoder(w).Encode(response)
    if err != nil {
        utils.SendErrorResponse(w, "Error encoding response", http.StatusInternalServerError)
        return
    }
}