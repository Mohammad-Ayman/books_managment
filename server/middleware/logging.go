package middleware

import (
    "net/http"
	
    "github.com/mohammad-ayman/books_managment/server/internal/models"
)

// LoggingMiddleware logs information about incoming requests to the database
func LoggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
     
        models.LogRequestToDB(r)

        // Call the next handler
        next.ServeHTTP(w, r)
    })
}


