import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "./Dashboard.module.scss";
import Check_icon from "@/public/icons/check_icon.svg";
import { FormEvent, useState } from "react";

export default function ColumnDashboard() {
  const [selectedColor, setSelectedColor] = useState("green");

  const handleColorSelect = (colorName: string) => {
    setSelectedColor(colorName);
  };

  const selectColorButton = (colorName: string) => {
    return (
      <button
        className={styles["column-dashboard-color-button"]}
        onClick={() => handleColorSelect(colorName)}
      >
        <div
          className={`${styles["column-dashboard-color"]} ${styles[colorName]}`}
        >
          {selectedColor === colorName && <Check_icon width="24" height="24" />}
        </div>
      </button>
    );
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // post 요청 보내기 & router 이동
    // const formData=(e)=>{
    //   return{
    //     title:,
    //     color:selectedColor,
    //   };
    // };
  };

  return (
    <div className={styles["column-dashboard"]}>
      <div className={styles["column-dashboard-container"]}>
      <h1 className={styles["column-dashboard-h1"]}>새로운 대시보드</h1>
      <div className={styles["column-dashboard-name-container"]}>
        <div className={styles["column-dashboard-input-container"]}>
          <label className={styles["column-dashboard-label"]}>
            대시보드 이름
          </label>
          <input></input>
        </div>
        <div className={styles["column-dashboard-color-container"]}>
          {["green", "purple", "orange", "blue", "pink"].map((colorName) =>
            selectColorButton(colorName)
          )}
        </div>
      </div>
      <div className={styles["column-dashboard-button-container"]}>
        <ModalButton isCancled={true}>취소</ModalButton>
        <ModalButton isComment={true} onClick={handleSubmit}>
          생성
        </ModalButton>
      </div>
      </div>
    </div>
  );
}
