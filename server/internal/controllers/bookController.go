package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/mohammad-ayman/books_managment/server/internal/models"
	"github.com/mohammad-ayman/books_managment/server/internal/services"
	"github.com/mohammad-ayman/books_managment/server/utils"
)

// GetBooks returns all books
func GetBooks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Fetch all books
	books, err := services.GetAllBooks()
	if err != nil {
		return
	}

	utils.SendDataResponse(w, books, http.StatusOK)
}

// GetBook returns a book by id
func GetBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	bookID, err := strconv.Atoi(vars["bookId"])
	if err != nil {
		utils.SendErrorResponse(w, "Invalid book ID", http.StatusBadRequest)
		return
	}

	// Fetch the book
	book, err := services.GetBook(bookID)
	if err != nil {
		utils.SendErrorResponse(w, "error fetching book", http.StatusInternalServerError)
		return
	}

	if book.ID == 0 {
		fmt.Println("Book not found")
		utils.SendErrorResponse(w, "Book not found", http.StatusNotFound)
		return
	}

	utils.SendDataResponse(w, book, http.StatusOK)
}

// createBook creates and returns a book
func CreateBook(w http.ResponseWriter, r *http.Request) {
	var newBook models.Book
	w.Header().Set("Content-Type", "application/json")

	// Decode the request body into newBook
	err := json.NewDecoder(r.Body).Decode(&newBook)
	if err != nil {
		utils.SendErrorResponse(w, "Invalid book data", http.StatusBadRequest)
		return
	}

	// Validate required fields
	if newBook.Title == "" || newBook.Author == "" {
		utils.SendErrorResponse(w, "Required fields are missing", http.StatusBadRequest)
		return
	}

	// Create the book using the models package
	book, err := services.CreateBook(&newBook)
	if err != nil {
		fmt.Println("Error creating book:", err)
		utils.SendErrorResponse(w, "Error creating book", http.StatusInternalServerError)
		return
	}

	utils.SendDataResponse(w, book, http.StatusCreated)
}

// UpdateBookHandler updates a book by id
func UpdateBook(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	bookID, err := strconv.Atoi(vars["bookId"])
	if err != nil {
		utils.SendErrorResponse(w, "Invalid book ID", http.StatusBadRequest)
		return
	}

	var updatedBook *models.Book
	if err := json.NewDecoder(r.Body).Decode(&updatedBook); err != nil {
		utils.SendErrorResponse(w, "Invalid book ID", http.StatusBadRequest)
		return
	}

	updatedBook, err = services.UpdateBook(bookID, updatedBook)
	if err != nil {
		utils.SendErrorResponse(w, "Error updating book", http.StatusBadRequest)
		return
	}

	utils.SendDataResponse(w, updatedBook, http.StatusOK)
}

// DeleteBook returns deleted book
func DeleteBook(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	bookID, err := strconv.Atoi(vars["bookId"])
	if err != nil {
		utils.SendErrorResponse(w, "Invalid book ID", http.StatusBadRequest)
		return
	}

	// Fetch the book
	book, err := services.DeleteBook(bookID)
	if err != nil {
		utils.SendErrorResponse(w, "error deleting book", http.StatusBadRequest)
		return
	}
	if book.ID == 0 {
		fmt.Println("Book not found")
		utils.SendErrorResponse(w, "Book not found", http.StatusBadRequest)
		return
	}

	utils.SendDataResponse(w, book, http.StatusOK)
}