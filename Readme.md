# Books Management and Canonical Redirect System

The Books Management and Canonical Redirect System is a web application designed to manage information about books and authors, as well as handle canonicalization and redirection of URLs.

## Internal Features (Books Management)

### Features

- **Book Management**: Add, view, edit, and delete books.
- **Author Management**: Add, view, edit, and delete authors.
- **Search**: Search for books and authors based on various criteria.
- **RESTful API**: Expose endpoints to interact with the system programmatically.
- **Logging**: Log incoming requests for monitoring and analysis.

### Technologies Used

- **Go**: Backend development language
- **Gorilla Mux**: HTTP router for handling routing in the Go application
- **GORM**: Object-Relational Mapping (ORM) library for Go
- **PostgreSQL**: Relational database management system
- **dotenv**: Go library for loading environment variables from a .env file

## Canonical Redirect Functionality

### Features

- **Canonicalization**: Convert URLs to a standard format.
- **Redirection**: Redirect URLs to a canonical form or preferred URL.
- **Flexible Configuration**: Support for different types of URL operations.

### Technologies Used

- **Go**: Backend development language
- **Gorilla Mux**: HTTP router for handling routing in the Go application
- **JSON Handling**: JSON encoding and decoding for request and response payloads.

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
    # Common environment variables for both parts
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

### Internal (Books Management) API

#### Endpoints

- **GET /api/book**: Get all books
- **GET /api/book/{bookId}**: Get a book by ID
- **POST /api/book**: Create a new book
- **PUT /api/book/{bookId}**: Update an existing book
- **DELETE /api/book/{bookId}**: Delete a book by ID

For detailed API documentation, refer to the API reference or Swagger documentation.

### Canonical Redirect API

#### Endpoints

- **POST /process-url**: Handle canonicalization and redirection operations.

#### Canonicalization Request Body Example

```json
{
    "url": "https://example.com/URL-to-process",
    "operation": "canonical"
}
```
#### Redirection Request Body Example

```json
{
    "url": "https://example.com/URL-to-redirect",
    "operation": "redirect"
}
```

Response from both endpoints will contain a JSON object with `processed_url` field indicating the processed or redirected URL.

## Running Tests

To run tests for the canonical redirect functionality, use the following command:

```bash
go test -v ./canonicalRedirect/controllers
```
