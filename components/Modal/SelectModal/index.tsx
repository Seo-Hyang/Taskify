import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "./index.module.scss";
import { MouseEvent } from "react";

interface Props {
  message: string;
  isShow: boolean;
  btn1Text: string;
  btn2Text: string;
  btn1OnClcik: (e: MouseEvent<HTMLButtonElement>) => void;
  btn2OnClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function SelectModal({
  message,
  isShow,
  btn1Text,
  btn2Text,
  btn1OnClcik,
  btn2OnClick,
}: Props) {
  if (!isShow) {
    return null;
  }

  return (
    <div className={styles["modalContainer"]}>
      <div className={styles["modalBox"]}>
        <div className={styles["contentContainer"]}>
          <h1 className={styles["contentH1"]}>{message}</h1>
          <div className={styles["contentButtonContainer"]}>
            <ModalButton isCancled={true} onClick={btn1OnClcik}>
              {btn1Text}
            </ModalButton>
            <ModalButton isComment={true} onClick={btn2OnClick}>
              {btn2Text}
            </ModalButton>
          </div>
        </div>
      </div>
    </div>
  );
}
