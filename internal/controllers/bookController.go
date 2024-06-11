package controllers

import (
	"fmt"
	"net/http"
	"encoding/json"
	"strconv"
	
	"github.com/gorilla/mux"
	"github.com/mohammad-ayman/books_managment/internal/models"
	"github.com/mohammad-ayman/books_managment/internal/services"
)

// GetBooks returns all books
func GetBooks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Fetch all books
	books, err := services.GetAllBooks()
	if err != nil {
		http.Error(w, "Error", http.StatusBadRequest)
		return
	}
	// Encode the books data to JSON and write it to the response
	err = json.NewEncoder(w).Encode(books)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}

// GetBook returns a book by id
func GetBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	bookID, err := strconv.Atoi(vars["bookId"])
	if err != nil {
		http.Error(w, "Invalid book ID", http.StatusBadRequest)
		return
	}

	// Fetch the book
	book, _ := services.GetBook(bookID)

	if book.ID == 0 {
		fmt.Println("Book not found")
		http.Error(w, "Book not found", http.StatusNotFound)
		return
	}

	err = json.NewEncoder(w).Encode(book)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}

// createBook creates and returns a book
func CreateBook(w http.ResponseWriter, r *http.Request) {
	var newBook models.Book
	w.Header().Set("Content-Type", "application/json")

	// Decode the request body into newBook
	err := json.NewDecoder(r.Body).Decode(&newBook)
	if err != nil {
		http.Error(w, "Invalid book data", http.StatusBadRequest)
		return
	}

	// Validate required fields
	if newBook.Title == "" || newBook.Author == "" {
		http.Error(w, "Required fields are missing", http.StatusBadRequest)
		return
	}

	// Create the book using the models package
	book, err := services.CreateBook(&newBook)
	if err != nil {
		fmt.Println("Error creating book:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Encode the created book as JSON and write it to the response
	err = json.NewEncoder(w).Encode(book)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

// UpdateBookHandler updates a book by id
func UpdateBook(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	bookID, err := strconv.Atoi(vars["bookId"])
	if err != nil {
		http.Error(w, "Invalid book ID", http.StatusBadRequest)
		return
	}

	var updatedBook *models.Book
	if err := json.NewDecoder(r.Body).Decode(&updatedBook); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Validate required fields
	if updatedBook.Title == "" || updatedBook.Author == "" {
		http.Error(w, "Required fields are missing", http.StatusBadRequest)
		return
	}

	updatedBook, err = services.UpdateBook(bookID, updatedBook)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(updatedBook); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

// DeleteBook returns deleted book
func DeleteBook(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	bookID, err := strconv.Atoi(vars["bookId"])
	if err != nil {
		http.Error(w, "Invalid book ID", http.StatusBadRequest)
		return
	}

	// Fetch the book
	book, err := services.DeleteBook(bookID)
	if err != nil {
		http.Error(w, "Invalid book ID", http.StatusBadRequest)
		return
	}
	if book.ID == 0 {
		fmt.Println("Book not found")
		http.Error(w, "Book not found", http.StatusNotFound)
		return
	}

	err = json.NewEncoder(w).Encode(book)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}