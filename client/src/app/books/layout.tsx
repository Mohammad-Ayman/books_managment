import { BookContextProvider } from "@/contexts/BookContext";
import { ReactNode } from "react";

const BooksLayout: React.FC<{ children: ReactNode }> = async ({ children }) => {
  return (
    <BookContextProvider >{children}</BookContextProvider>
  );
};

export default BooksLayout;
