import BooksContent from "@/components/books-tabs/BooksContent";
import { Suspense } from "react";

const Books = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <BooksContent />
  </Suspense>
);

export default Books;
