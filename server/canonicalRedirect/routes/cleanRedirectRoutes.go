package routes

import (
	"github.com/gorilla/mux"
	"github.com/mohammad-ayman/books_managment/server/canonicalRedirect/controllers"
)


// InitializeRoutes initializes all routes
var CanonicalRedirectRoutes = func(router *mux.Router) {
	router.HandleFunc("/", controllers.HandleCanonicalRedirect).Methods("POST")
	router.HandleFunc("", controllers.HandleCanonicalRedirect).Methods("POST")
}