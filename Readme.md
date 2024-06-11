# Books Management System

The Books Management System is a web application designed to manage information about books, authors, and related data. It provides functionalities to create, read, update, and delete (CRUD) records for books and authors.

## Features

- **Book Management**: Add, view, edit, and delete books.
- **Author Management**: Add, view, edit, and delete authors.
- **Search**: Search for books and authors based on various criteria.
- **RESTful API**: Expose RESTful API endpoints to interact with the system programmatically.
- **Logging**: Log incoming requests to the system for monitoring and analysis.

## Technologies Used

- **Go**: Backend development language
- **Gorilla Mux**: HTTP router for handling routing in the Go application
- **GORM**: Object-Relational Mapping (ORM) library for Go
- **PostgreSQL**: Relational database management system
- **dotenv**: Go library for loading environment variables from a .env file

## Getting Started

### Prerequisites

- Go programming language installed on your system
- PostgreSQL database server installed and running
- Text editor or IDE for code editing

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/mohammad-ayman/books_management.git
    ```

2. Navigate to the project directory:

    ```bash
    cd books_management
    ```

3. Install dependencies:

    ```bash
    go mod tidy
    ```

4. Set up the environment variables by creating a `.env` file and adding the necessary configurations:

    ```plaintext
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=books_management
    DB_SSLMODE=disable
    ```

5. Run the application:

    ```bash
    go run cmd/main.go
    ```

6. Access the application in your web browser at `http://localhost:8080`.

## API Documentation

The API provides endpoints for managing books and authors. Here are the available endpoints:

- **GET /api/book**: Get all books
- **GET /api/book/{bookId}**: Get a book by ID
- **POST /api/book**: Create a new book
- **PUT /api/book/{bookId}**: Update an existing book
- **DELETE /api/book/{bookId}**: Delete a book by ID

For more detailed API documentation, refer to the API reference or Swagger documentation.



