package models

import (
    "time"
	"net/http"
	"log"

    "github.com/jinzhu/gorm"
	"github.com/mohammad-ayman/books_managment/server/internal/config"
)

type RequestLog struct {
    gorm.Model
    Method      string    `json:"method"`
    RequestURI  string    `json:"request_uri"`
	UserIP	  string    `json:"user_ip"`
    Timestamp   time.Time `json:"timestamp"`
}

func init() {
	config.InitializeDatabase()
	db = config.GetDB()
	db.AutoMigrate(&RequestLog{})
}


// logRequestToDB saves information about the incoming request to the database
func LogRequestToDB(r *http.Request) {

    db := config.GetDB()

    // Create a new request log entry
    requestLog := RequestLog{
        Method:     r.Method,
        RequestURI: r.RequestURI,
		UserIP:     r.RemoteAddr,
        Timestamp:  time.Now(),
    }

    // Save the request log to the database
    if err := db.Create(&requestLog).Error; err != nil {
        log.Printf("Error saving request log to database: %v", err)
    }
}