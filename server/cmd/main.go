// main.go
package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/joho/godotenv"
	"github.com/rs/cors"

	redirectRoutes "github.com/mohammad-ayman/books_managment/server/canonicalRedirect/routes"
	"github.com/mohammad-ayman/books_managment/server/internal/config"
	internalRoutes "github.com/mohammad-ayman/books_managment/server/internal/routes"
	"github.com/mohammad-ayman/books_managment/server/middleware"
)    


func main() {    
    // Load environment variables from .env file
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    port := os.Getenv("PORT")
    if port == "" {
        port = "8080" 
    }

    // Initialize the database
    config.InitializeDatabase()
    router := mux.NewRouter()

    // Attach logging middleware to all requests
    router.Use(middleware.LoggingMiddleware)

	// Create a subrouter for API requests
	apiRouter := router.PathPrefix("/api").Subrouter()
    CanonicalRedirectRouter := router.PathPrefix("/process-url").Subrouter()
	
	// Register routes for the API subrouter
	internalRoutes.BooksManagmentRoutes(apiRouter)

    // Register routes for the cleanRedirect subrouter
    redirectRoutes.CanonicalRedirectRoutes(CanonicalRedirectRouter)
    

    // Configure CORS
    c := cors.New(cors.Options{
        AllowedOrigins:   []string{"http://localhost:3000"}, // Allow only frontend origin
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
        AllowedHeaders:   []string{"Content-Type", "Authorization"},
        AllowCredentials: true,
    })

    // Wrap the router with the CORS middleware
    handler := c.Handler(router)

    fmt.Println("server running on port " + port)
    log.Fatal(http.ListenAndServe(":"+port, handler))
}
