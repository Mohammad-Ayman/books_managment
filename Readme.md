# Books Management and Canonical Redirect System

The Books Management and Canonical Redirect System is a web application designed to manage information about books and authors, as well as handle canonicalization and redirection of URLs.

## Table of Contents

1. [Internal Features (Books Management)](#internal-features-books-management)
   - [Server-side (Go Backend)](#server-side-go-backend)
   - [Client-side (Next.js Frontend)](#client-side-nextjs-frontend)
   - [Screenshots](#screenshots)
   - [Getting Started](#getting-started)
   - [CRUD Functionalities](#crud-functionalities)
2. [Canonical Redirect Functionality](#canonical-redirect-functionality)
   - [Features](#features)
   - [Technologies Used](#technologies-used)
   - [Getting Started](#getting-started-1)
   - [API Documentation](#api-documentation)
   - [Running Tests](#running-tests)

## Internal Features (Books Management)

### Server-side (Go Backend)

#### Features

- **Book Management**: Add, view, edit, and delete books.
- **Author Management**: Add, view, edit, and delete authors.
- **Search**: Search for books and authors based on various criteria.
- **RESTful API**: Expose endpoints to interact with the system programmatically.
- **Logging**: Log incoming requests for monitoring and analysis.

#### Technologies Used

- **Go**: Backend development language
- **Gorilla Mux**: HTTP router for handling routing in the Go application
- **GORM**: Object-Relational Mapping (ORM) library for Go
- **PostgreSQL**: Relational database management system
- **dotenv**: Go library for loading environment variables from a .env file

#### Getting Started

##### Prerequisites

- Go programming language installed on your system
- PostgreSQL database server installed and running
- Text editor or IDE for code editing

##### Installation

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

6. The server will be accessible at `http://localhost:8080`.

##### API Documentation

###### Endpoints

- **GET /api/book**: Get all books
- **GET /api/book/{bookId}**: Get a book by ID
- **POST /api/book**: Create a new book
- **PUT /api/book/{bookId}**: Update an existing book
- **DELETE /api/book/{bookId}**: Delete a book by ID

For detailed API documentation, refer to <a href="https://www.postman.com/galactic-meteor-482293/workspace/golang/request/33474187-4b0cce24-5b52-4d3d-9b18-8dfca46af0c6" target="_blank">Postman</a>.

### Client-side (Next.js Frontend)

#### Features

- **User Interface**: Interactive interface to manage books and authors.
- **CRUD Operations**: Create, Read, Update, and Delete books and authors seamlessly.
- **Integration with Backend**: Communicates with the backend API to fetch and modify data.

#### Technologies Used

- **Next.js**: React framework for frontend development
- **React Hooks**: For managing state and side effects within functional components
- **CSS Modules**: Local scoped CSS for styling components

#### Screenshots

##### Landing Page

![Landing Page](/client/public/Landing%20Page.png)

##### All Books

![All Books](/client/public/All%20Books.png)

##### Get Book

![Get Book](/client/public/Get%20Book.png)

#### Getting Started

##### Prerequisites

- Node.js and npm installed on your system
- Access to the Books Management System backend server

##### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the Next.js development server:

   ```bash
   npm run dev
   ```

3. Access the frontend application in your web browser at `http://localhost:3000`.

##### CRUD Functionalities

- **Create**: Add new books and authors using a form.
- **Read**: View a list of all books and authors, with details available for each individual book.
- **Update**: Edit existing books and authors through an edit form.
- **Delete**: Remove books and authors from the database.

## Canonical Redirect Functionality

### Features

- **Canonicalization**: Convert URLs to a standard format.
- **Redirection**: Redirect URLs to a canonical form or preferred URL.
- **Flexible Configuration**: Support for different types of URL operations.

### Technologies Used

- **Go**: Backend development language
- **Gorilla Mux**: HTTP router for handling routing in the Go application
- **JSON Handling**: JSON encoding and decoding for request and response payloads.

### Getting Started

#### Prerequisites

- Go programming language installed on your system
- PostgreSQL database server installed and running
- Text editor or IDE for code editing

#### Installation

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

### API Documentation

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

For detailed API documentation, refer to <a href="https://www.postman.com/galactic-meteor-482293/workspace/golang/request/33474187-4b0cce24-5b52-4d3d-9b18-8dfca46af0c6" target="_blank">Postman</a>.

## Running Tests

To run tests for the canonical redirect functionality, use the following command:

```bash
go test -v ./canonicalRedirect/controllers
```
