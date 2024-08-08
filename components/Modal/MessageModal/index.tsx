import styles from "./index.module.scss";
import ModalButton from "@/components/Button/ModalButton/ModalButton";
import { MouseEvent } from "react";

interface Props {
  message: string;
  isShow: boolean;
  onConfirm: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function MessageModal({ message, isShow, onConfirm }: Props) {
  if (!isShow) {
    return null;
  }

  return (
    <div className={styles["modalContainer"]}>
      <div className={styles["modalBox"]}>
        <div className={styles["contentContainer"]}>
          <h1 className={styles["contentH1"]}>{message}</h1>
          <ModalButton
            onClick={onConfirm}
            isComment={true}
            className={styles["contentButton"]}
          >
            확인
          </ModalButton>
        </div>
      </div>
    </div>
  );
}
