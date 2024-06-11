package routes

import (
	"github.com/gorilla/mux"
	"github.com/mohammad-ayman/books_managment/internal/controllers"
)

// InitializeRoutes initializes all routes
var BooksManagmentRoutes = func(router *mux.Router) {
	router.HandleFunc("/book", controllers.GetBooks).Methods("GET")
	router.HandleFunc("/book/{bookId}", controllers.GetBook).Methods("GET")
	router.HandleFunc("/book", controllers.CreateBook).Methods("POST")
	router.HandleFunc("/book/{bookId}", controllers.UpdateBook).Methods("PUT")
	router.HandleFunc("/book/{bookId}", controllers.DeleteBook).Methods("DELETE")
}