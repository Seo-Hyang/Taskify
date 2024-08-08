import React from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <p>{message}</p>
          <button className={styles.modalButton} onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
