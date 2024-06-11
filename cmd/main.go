// main.go
package main

import (
    "fmt"
    "log"
    "net/http"
    "os"

    "github.com/gorilla/mux"
    "github.com/joho/godotenv"
    _ "github.com/jinzhu/gorm/dialects/postgres"

    "github.com/mohammad-ayman/books_managment/internal/routes"
    "github.com/mohammad-ayman/books_managment/internal/config"
    "github.com/mohammad-ayman/books_managment/middleware"
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
	
	// Register routes for the API subrouter
	routes.BooksManagmentRoutes(apiRouter)
    
    fmt.Println("server running on port " + port)
    log.Fatal(http.ListenAndServe(":"+port, router))
}
