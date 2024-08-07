import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "./ColumnDelete.module.scss";
import { putcolumnDelete, getColumnAdd } from "@/lib/columnApi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ColumnDelete(columnId:string, dashboardId:string) {

  // 칼럼 삭제
  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await putcolumnDelete(columnId);
    } catch (err) {
      console.error("해당 칼럼 삭제에 실패했습니다.");
    }
  };

  return (
    <div className={styles["column-delete"]}>
      <div className={styles["column-delete-container"]}>
        <h1 className={styles["column-delete-h1"]}>
          칼럼의 모든 카드가 삭제됩니다.
        </h1>
        <div className={styles["column-delete-button-container"]}>
          <ModalButton isCancled={true}>취소</ModalButton>
          <ModalButton isComment={true} onClick={handleDeleteClick}>
            삭제
          </ModalButton>
        </div>
      </div>
    </div>
  );
}
