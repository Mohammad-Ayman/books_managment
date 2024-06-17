"use client";
import { useState, FormEvent } from "react";
import ModalContent from "../common/ModalContent";
import { toast } from "sonner";
import { modalType } from "@/types/modalType";
import { useBooks } from "@/contexts/BookContext";
import DeleteContentModal from "../common/DeleteContentModal";
import endpoints from "@/config/server";
import TextInput from "@/buildingComponents/TextInput";
import styles from "../../components/books-tabs/styles/bookInformation.module.css";

interface Props {
  modalType: modalType;
  closeModal: () => void;
}

const BookModal: React.FC<Props> = ({ closeModal, modalType }) => {
  const { addBook, deleteBookCtx } = useBooks();
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [isbn, setIsbn] = useState<string>("");

  const createBook = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !author) {
      toast.warning("Author and Title fields are required");
      return false;
    }
    try {
      const requestBody = { title, author, isbn };
      const response = await fetch(endpoints.addBook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const responseData = await response.json();
      addBook(responseData.data);
      toast.success("Book added successfully");
      closeModal();
      setTitle("");
      setAuthor("");
      setIsbn("");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {modalType === "view" && (
        <ModalContent onSubmit={createBook}>
          <form onSubmit={createBook}>
            <TextInput
              label="Title"
              name="title"
              placeholder="Type The Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              divStyle={{ marginTop: "1rem", fontWeight: "bold" }}
              style={{ border: "none", outline: "none" }}
            />
            <TextInput
              label="Author"
              name="author"
              placeholder="Type The Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              divStyle={{ marginTop: "1rem", fontWeight: "bold" }}
              style={{ border: "none", outline: "none" }}
            />
            <TextInput
              label="ISBN"
              name="isbn"
              placeholder="Type The ISBN"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              divStyle={{ marginTop: "1rem", fontWeight: "bold" }}
              style={{ border: "none", outline: "none" }}
            />
          </form>
        </ModalContent>
      )}
      {modalType === "delete" && (
        <DeleteContentModal deleteFunction={deleteBookCtx} />
      )}
    </>
  );
};

export default BookModal;
