import Modal from "../../ui/modal/Modal";
import { useModal } from "../../contexts/ModalContext";
import styles from "../../components/common/styles/modalContent.module.css";

interface Props {
  deleteFunction: () => void;
}

const DeleteContentModal: React.FC<Props> = ({ deleteFunction }) => {
  const { isOpen, closeModal } = useModal();

  const confirmDelete = () => {
    deleteFunction();
    closeModal();
  };

  const cancelDelete = () => {
    closeModal();
  };
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div
        className={`${styles["parent-container"]} mflex`}
        style={{ padding: "0 2rem" }}
      >
        <section className={`${styles["modal-header"]} mflex`}>
          <h1 style={{ fontSize: "3rem", marginBottom: "2rem" }}>
            Warning
          </h1>
          <button onClick={cancelDelete} style={{ fontSize: "3rem" }}>
            &times;
          </button>
        </section>
        <section>
          <h2 style={{ fontSize: "2rem" }}>
            Are you sure you want to delete it?
          </h2>
        </section>
        <article className={styles["controls-container"]}>
          <button
            onClick={cancelDelete}
            className={`${styles["close-btn"]} `}
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className={`${styles["submit-btn"]} `}
          >
            Save
          </button>
        </article>
      </div>
    </Modal>
  );
};

export default DeleteContentModal;
