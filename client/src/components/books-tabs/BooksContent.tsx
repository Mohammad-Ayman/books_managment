"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Card from "../../buildingComponents/Card";
import ListItems from "../../buildingComponents/ListItems";
import TextInput from "../../buildingComponents/TextInput";
import { useModal } from "../../contexts/ModalContext";
import styles from "@/app/books/books.module.css";
import { modalType } from "@/types/modalType";
import { useBooks } from "@/contexts/BookContext";
import BookModal from "@/components/books-tabs/BookModal";

const BooksContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const add = searchParams.get("add");
  const [filterValue, setFilterValue] = useState("");
  const [modalType, setModalType] = useState<modalType>();

  const { openModal, closeModal } = useModal();
  const { books, initializeDeleteRequest } = useBooks();

  const [filteredData, setFilteredData] = useState<IBook[]>(books);

  // useEffect to handle add book query
  useEffect(() => {
    if (add) handleAddBook();
  }, []);

  const handleFilterChange = (event: any) => {
    setFilterValue(event.target.value);
  };

  const handleAddBook = async () => {
    setModalType("view");
    openModal();
  };

  const filterData = () => {
    const filteredData =
      Array.isArray(books) && books.length > 0
        ? books
            ?.filter(
              (item: Record<string, any>) =>
                item["ID"]?.toString().includes(filterValue) ||
                item["title"]
                  ?.toLowerCase()
                  .includes(filterValue.toLowerCase()) ||
                item["author"]
                  ?.toLowerCase()
                  .includes(filterValue.toLowerCase())
            )
            ?.map((item: any) => ({
              ...item,
              PREVIEW_ME: (e: any) => {
                router.push(`/books/${item["ID"]}`);
              },
              DELETE_ME: (e: any) => {
                initializeDeleteRequest(item["ID"]);
                handleModalOpen("delete");
              },
            }))
        : [];

    setFilteredData(filteredData);
  };

  useMemo(() => {
    filterData();
  }, [filterValue, books]);

  const handleModalOpen = (modalType: modalType) => {
    setModalType(modalType);
    openModal();
  };
  return (
    <Card style={{ minHeight: "90vh", borderTopLeftRadius: "0" }}>
      <section className={styles["controls-container"]}>
        <TextInput
          label="Search"
          labelStyle={{ fontSize: "1.6rem" }}
          divStyle={{ width: "auto", padding: "1rem" }}
          style={{ fontSize: "1.6rem", padding: "0.5rem 1rem" }}
          onChange={handleFilterChange}
        />
        <button onClick={handleAddBook}>Add Book</button>
      </section>
      <ListItems heading="" data={filteredData} id={"ID"} />
      {modalType && <BookModal closeModal={closeModal} modalType={modalType} />}
    </Card>
  );
};

export default BooksContent;
