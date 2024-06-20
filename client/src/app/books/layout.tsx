import { BookContextProvider } from "@/contexts/BookContext";
import { getAllBooks } from "@/utils/actions/actions";
import { ReactNode } from "react";

const BooksLayout: React.FC<{ children: ReactNode }> = async ({ children }) => {
  const books = await getAllBooks();
  return (
    <BookContextProvider initialBooks={books}>{children}</BookContextProvider>
  );
};

export default BooksLayout;
