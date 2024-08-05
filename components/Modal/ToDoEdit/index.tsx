import styles from "../ToDoCreate.module.scss";
import ModalButton from "@/components/Button/ModalButton/ModalButton";
import Arrow_drop from "@/public/icons/arrow_drop.svg";
import Check_icon from "@/public/icons/check_icon.svg";
import { useState } from "react";

export default function ToDoEdit() {
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isColuumnSelected, setIsColuumnSelected] = useState();
  const [isAssignSelected, setIsAssignSelected] = useState();

  const toggleColumnDropdown = () => {
    setIsColumnOpen(!isColumnOpen);
  };

  const toggleAssignDropdown = () => {
    setIsAssignOpen(isAssignOpen);
  };

  return (
    <div className={styles["todo-create"]}>
      <h1 className={styles["todo-create-h1"]}>할일 수정</h1>
      <div className={styles["todo-create-input-section"]}>
        <div className={styles["todo-create-input-container"]}>
          <div className={styles["todo-create-input-auth"]}>
            <label className={styles["todo-create-label"]}>상태</label>
            <div
              className={`${styles["todo-create-input"]} ${styles["todo-create-input-div"]}`}
            >
              <input className={styles.input}></input>
              <Arrow_drop
                onClick={toggleColumnDropdown}
                width="26"
                height="26"
              />
              {/* 상태 - columnId */}
              {isColumnOpen && (
                <>
                  <div className={styles["toggle-menu-container"]}>
                    {/* 선택 됐을 때 check_icon 뜰 수 있게 초깃값은 첫 번째 값 */}
                    <Check_icon width="22" height="22" />
                    <div className={styles["toggle-column-item-container"]}>
                      <div
                        className={styles["toggle-column-item-circle"]}
                      ></div>
                      {/* <span className={styles["toggle-column-item"]}>상태넣기</span> */}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={styles["todo-create-input-auth"]}>
            <label className={styles["todo-create-label"]}>담당자</label>
            <div
              className={`${styles["todo-create-input"]} ${styles["todo-create-input-div"]}`}
            >
              <input></input>
              <Arrow_drop
                onClick={toggleAssignDropdown}
                width="26"
                height="26"
              />
              {/* 담당자 - assignee-id */}
              {isAssignOpen && (
                <>
                  <div className={styles["toggle-menu-container"]}>
                    <Check_icon width="22" height="22" />
                    <div className={styles["toggle-assign-item-container"]}>
                      {/* <div className={styles["toggle-assign-item-img"]}>프로필 이미지 넣기</div> */}
                      {/* 프로필 이미지 색상 랜덤 */}
                      {/* <span className={styles["toggle-assign-item"]}>상태넣기</span> */}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-auth-label"]}>제목 *</label>
          <input></input>
        </div>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-auth-label"]}>설명 *</label>
          <input></input>
        </div>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-auth-label"]}>마감일</label>
          <input></input>
        </div>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-auth-label"]}>태그</label>
          <input></input>
          {/* 전의 태그 값 그대로 들고오기 */}
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
