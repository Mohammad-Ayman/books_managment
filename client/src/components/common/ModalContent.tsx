import { ReactNode, useState } from "react";
import styles from "../../components/common/styles/modalContent.module.css";
import Modal from "../../ui/modal/Modal";
import { useModal } from "../../contexts/ModalContext";

interface Props {
  children: ReactNode;
  onSubmit: (e?: any) => any;
  onClose?: (e?: any) => any;
  submitBtnCaption?: string;
  cancelBtnCaption?: string;
}

const ModalContent: React.FC<Props> = ({
  children,
  onSubmit,
  submitBtnCaption = "Submit",
  onClose,
  cancelBtnCaption = "Cancel",
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, closeModal } = useModal();

  const handleClose = (e?: any) => {
    onClose?.();
    closeModal();
  };

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(e);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className={`${styles["parent-container"]} mflex`}>
        <section className={`${styles["modal-header"]} mflex`}>
          <h3>Add New Book</h3>
          <button onClick={handleClose}>&times;</button>
        </section>
        <article className={`${styles["data-container"]} mflex`}>
          {children}
        </article>
        <article className={styles["controls-container"]}>
          <button
            disabled={loading}
            onClick={handleClose}
            className={`${loading ? styles["loading"] : styles["close-btn"]}`}
          >
            {cancelBtnCaption}
          </button>
          <button
            className={`${loading ? styles["loading"] : styles["submit-btn"]}`}
            onClick={onSubmitHandler}
            disabled={loading}
          >
            {submitBtnCaption}
          </button>
        </article>
      </div>
    </Modal>
  );
};

export default ModalContent;
