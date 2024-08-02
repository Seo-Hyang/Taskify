import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "./ToDoCreate.module.scss";

export default function ToDoCreate() {
  return (
    <div className={styles["todo-create"]}>
      <h1 className={styles["todo-create-h1"]}>할일 생성</h1>
      <div className={styles["todo-create-input-section"]}>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-label"]}>담당자</label>
          <input></input>
        </div>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-auth-label"]}>제목*</label>
          <input></input>
        </div>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-auth-label"]}>설명*</label>
          <input></input>
        </div>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-auth-label"]}>마감일</label>
          <input></input>
        </div>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-auth-label"]}>태그</label>
          <input></input>
        </div>
        <div className={styles["todo-create-input-img"]}>
          <label className={styles["todo-create-auth-label"]}>이미지</label>
        </div>
      </div>

      <div className={styles["todo-create-button-container"]}>
        <ModalButton isCancled={true}>취소</ModalButton>
        <ModalButton isComment={true}>생성</ModalButton>
      </div>
    </div>
  );
}
