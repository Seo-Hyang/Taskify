import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "./Dashboard.module.scss";
import Check_icon from "@/public/icons/check_icon.svg";
import { useState } from "react";
import {TwitterPicker} from "react-color";

export default function ColumnDashboard() {
  const [color, setColor] = useState("#000");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // post 요청 보내기 & router 이동
    // const formData=(e)=>{
    //   return{
    //     title:,
    //     color:setColor,
    //   };
    // };
  };

  const ColorButton: React.FC = () => {
    const handleChangeComplete = (color: any) => {
      setColor(color.hex);
    };
    return (
      <TwitterPicker color={color} onChangeComplete={handleChangeComplete} className={styles["column-dashboard-color-picker"]} />
    );
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
          <ColorButton />
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
