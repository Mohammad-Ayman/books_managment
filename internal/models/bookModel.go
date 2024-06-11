package models

import (
	"github.com/jinzhu/gorm"
	"github.com/mohammad-ayman/books_managment/internal/config"
)

var db *gorm.DB

// Book model
type Book struct {
	gorm.Model
	Title  string `json:"title" gorm:"not null"`
	Author string `json:"author" gorm:"not null"`
	Isbn   string `json:"isbn"`
}

// InitializeDatabase initializes the database
func init() {
	config.InitializeDatabase()
	db = config.GetDB()
	db.AutoMigrate(&Book{})
}

// GetAllBooks returns all books
func GetAllBooks() ([]Book, error) {
	var books []Book
	if err := db.Find(&books).Error; err != nil {
		return nil, err
	}
	return books, nil
}

// GetBook returns a book by id
func GetBook(id int) (*Book, error) {
    var book Book
    if err := db.Where("id = ?", id).First(&book).Error; err != nil {
        if err == gorm.ErrRecordNotFound {
            return nil, nil 
        }
        return nil, err
    }
    return &book, nil
}


// CreateBook creates a new book
func CreateBook(book *Book) (*Book, error) {
	if err := db.Create(book).Error; err != nil {
		return nil, err
	}
	return book, nil
}

// UpdateBook updates a book's fields
func UpdateBook(id int, updatedBook *Book) (*Book, error) {
	var oldBook Book
	if err := db.Where("id = ?", id).First(&oldBook).Error; err != nil {
		return nil, err
	}
	if err := db.Model(&oldBook).Updates(updatedBook).Error; err != nil {
		return nil, err
	}
	if err := db.Where("id = ?", id).First(&oldBook).Error; err != nil {
		return nil, err
	}
	return &oldBook, nil
}

// DeleteBook deletes a book by id
func DeleteBook(id int) (*Book, error) {
	var book Book
	if err := db.Where("id = ?", id).First(&book).Error; err != nil {
		return nil, err
	}
	if err := db.Delete(&book).Error; err != nil {
		return nil, err
	}
	return &book, nil
}
