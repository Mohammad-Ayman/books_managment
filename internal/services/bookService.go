package services

import (
	"github.com/mohammad-ayman/books_managment/internal/models"
)

func GetAllBooks() ([]models.Book, error) {
	return models.GetAllBooks()
}

func GetBook(id int) (*models.Book, error) {
	return models.GetBook(id)
}

func CreateBook(book *models.Book) (*models.Book, error) {
	return models.CreateBook(book)
}

func UpdateBook(id int, updatedBook *models.Book) (*models.Book, error) {
	return models.UpdateBook(id, updatedBook)
}

func DeleteBook(id int) (*models.Book, error) {
	return models.DeleteBook(id)
}
