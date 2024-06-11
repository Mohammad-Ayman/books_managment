package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var db *gorm.DB

// InitializeDatabase initializes the database
func InitializeDatabase() {
	err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

	host := os.Getenv("DB_HOST")
    port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	dbname := os.Getenv("DB_NAME")
	password := os.Getenv("DB_PASSWORD")
	sslmode := os.Getenv("DB_SSLMODE")

	db, err = gorm.Open("postgres", "host=" + host + " port=" + port + " user=" + user + " dbname=" + dbname + " password=" + password + " sslmode=" + sslmode)
	if err != nil {
		panic(err)
	}

}

// db getter function
func GetDB() *gorm.DB {
	return db
}