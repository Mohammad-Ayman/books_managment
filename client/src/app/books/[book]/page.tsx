"use client";
import FormContainer from "../../../components/form/FormContainer";
import { useEffect, useState } from "react";
import { ModalContextProvider } from "../../../contexts/ModalContext";
import { unstable_noStore } from "next/cache";
import { toast } from "sonner";

import { useBooks } from "@/contexts/BookContext";
import endpoints from "@/config/server";
import BookInformation from "@/components/books-tabs/BookInformation";

interface Props {
  params: { book: number };
}

const BookPage: React.FC<Props> = ({ params }) => {
  const { updateBook } = useBooks();
  const { book } = params;
  const [books, setBook] = useState<Partial<IBook>>({});

  useEffect(() => {
    const fetchBook = async () => {
      unstable_noStore();
      const response = await fetch(endpoints.getBook + book);
      const bookData = await response.json();
      setBook(bookData.data);
    };

    fetchBook();
  }, []);

  const submitHandler = async (data: IBook) => {
    const formattedBookPageTable = {
      ID: +book,
      title: data["title"],
      author: data["author"],
      isbn: data["isbn"],
    };
    const formattedData: Partial<IBook> = {
      title: data["title"],
      author: data["author"],
      isbn: data["isbn"],
    };

    try {
      const apiUrl = endpoints.updateBook + `${book}`;
      unstable_noStore();
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update books. Error: ${errorData.message}`);
      }
      toast.success("Book updated successfully.");
      updateBook(+book, formattedBookPageTable);
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const tabs = [
    {
      label: "Book Information",
      content: (
        <ModalContextProvider>
          <BookInformation bookData={books} />
        </ModalContextProvider>
      ),
    },
  ];

  return (
    <FormContainer
      renderAll={false}
      heading={"Book"}
      tabs={tabs}
      submitAction={submitHandler}
    ></FormContainer>
  );
};

export default BookPage;
