import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "./index.module.scss";
import { putcolumnDelete, getColumnAdd } from "@/lib/columnApi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
  // 칼럼 삭제
  // const handleDeleteClick = async (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   try {
  //     await putcolumnDelete(columnId);
  //   } catch (err) {
  //     console.error("해당 칼럼 삭제에 실패했습니다.");
  //   }
  // };

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
