"use client";
import TextInput from "../../buildingComponents/TextInput";
import styles from "../../components/books-tabs/styles/bookInformation.module.css";

interface Props {
  bookData: Partial<IBook>;
}

const BookInformation: React.FC<Props> = ({ bookData }) => {
  const { title, author, isbn } = bookData || {};

  return (
    <section className={styles["parent-container"]}>
      <div className={styles["container"]}>
        <div>
          <TextInput
            label="Title"
            name="title"
            placeholder="Type Book Title"
            defaultValue={title}
          />

          <TextInput label="Author" name="author" defaultValue={author} />
          <TextInput label="isbn" defaultValue={isbn} />
        </div>
      </div>
    </section>
  );
};

export default BookInformation;
