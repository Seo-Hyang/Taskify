import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "../Column.module.scss";

export default function ColumnAdd() {
  // 동일한 이름 있을 때 경고창
  return (
    <div className={styles["column-auth"]}>
      <div className={styles["column-auth-container"]}>
        <h1 className={styles["column-h1"]}>새 칼럼 생성</h1>
        <div className={styles["column-add-label-container"]}>
          <label className={styles["column-label"]}>이름</label>
          <input></input>
        </div>
        <div className={styles["column-button-container"]}>
          <ModalButton isCancled={true}>취소</ModalButton>
          <ModalButton isComment={true}>생성</ModalButton>
        </div>
      </div>
    </div>
  );
}
