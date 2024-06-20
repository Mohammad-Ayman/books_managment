"use client";
import { deleteBook } from "@/utils/actions/actions";
import { createContext, FC, ReactNode, useContext, useState } from "react";

interface BookContextProps {
  books: IBook[];
  getBook: (id: number) => void;
  addBook: (Book: IBookResponse) => void;
  updateBook: (id: number, Book: IBook) => void;
  initializeDeleteRequest: (id: number) => void;
  resetDeleteRequest: () => void;
  deleteBookCtx: () => void;
}

const BookContext = createContext<BookContextProps | undefined>(undefined);

export const BookContextProvider: FC<{
  children: ReactNode;
  initialBooks: IBook[];
}> = ({ children, initialBooks }) => {
  const [books, setBooks] = useState<IBook[]>(initialBooks);
  const [bookIdToBeDeleted, setBookIdToBeDeleted] = useState<number>();

  const getBook = (id: number) => {
    return books.find((Book: any) => Book["Book"] === id);
  };

  const addBook = (book: IBookResponse) => {
    const newBook = {
      ID: book["ID"],
      title: book["title"],
      author: book["author"],
      isbn: book["isbn"],
      "Created At": book.CreatedAt.split("T")[0],
    };

    if (newBook["ID"] && newBook.title && newBook.author) {
      setBooks((prevBooks) => [
        {
          ID: newBook["ID"],
          title: newBook["title"],
          author: newBook["author"],
          isbn: newBook["isbn"],
          "Created At": book.CreatedAt.split("T")[0],
        },
        ...prevBooks,
      ]);
    }
  };

  const updateBook = (id: number, updatedBook: IBook) => {
    setBooks((prevBooks) => {
      const updatedBooks = [...prevBooks];
      const index = updatedBooks.findIndex((book: IBook) => book["ID"] == id);
      if (index !== -1) {
        // If the book with the given ID is found, update it
        updatedBooks[index] = {
          ID: updatedBooks[index]["ID"],
          title: updatedBook["title"],
          author: updatedBook["author"],
          isbn: updatedBook["isbn"],
          "Created At": updatedBooks[index]["Created At"],
        };
      }
      return updatedBooks;
    });
  };

  const initializeDeleteRequest = (id: number) => {
    setBookIdToBeDeleted(id);
  };
  const resetDeleteRequest = () => {
    setBookIdToBeDeleted(undefined);
  };

  const deleteBookCtx = async () => {
    try {
      const deletedBook = await deleteBook(bookIdToBeDeleted!);
      if (!deletedBook) {
        throw new Error("Failed to delete book");
      }
      resetDeleteRequest();
      const filteredBooks: IBook[] = books?.filter(
        (book) => book["ID"] !== bookIdToBeDeleted
      );
      setBooks(filteredBooks);
    } catch (error: any) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <BookContext.Provider
      value={{
        books,
        getBook,
        addBook,
        updateBook,
        initializeDeleteRequest,
        resetDeleteRequest,
        deleteBookCtx,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBooks must be used within a BookContextProvider");
  }
  return context;
};
