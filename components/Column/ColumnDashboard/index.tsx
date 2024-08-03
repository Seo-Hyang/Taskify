import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "./Dashboard.module.scss";
import check_icon from "@/public/icons/check_icon.svg";

export default function ColumnDashboard() {
  return (
    <div className={styles["column-dashboard"]}>
      <h1 className={styles["column-dashboard-h1"]}>새로운 대시보드</h1>
      <div className={styles["column-dashboard-name-container"]}>
        <div className={styles["column-dashboard-input-container"]}>
          <label className={styles["column-dashboard-label"]}>
            대시보드 이름
          </label>
          <input></input>
        </div>
        <div className={styles["column-dashboard-color-container"]}>
          <button className={styles["column-dashboard-color-button"]}>
            <div
              className={`${styles["column-dashboard-color"]} ${styles.green}`}
            ></div>
          </button>
          <button className={styles["column-dashboard-color-button"]}>
            <div
              className={`${styles["column-dashboard-color"]} ${styles.purple}`}
            ></div>
          </button>
          <button className={styles["column-dashboard-color-button"]}>
            <div
              className={`${styles["column-dashboard-color"]} ${styles.orange}`}
            ></div>
          </button>
          <button className={styles["column-dashboard-color-button"]}>
            <div
              className={`${styles["column-dashboard-color"]} ${styles.blue}`}
            ></div>
          </button>
          <button className={styles["column-dashboard-color-button"]}>
            <div
              className={`${styles["column-dashboard-color"]} ${styles.pink}`}
            ></div>
          </button>
        </div>
      </div>
      <div className={styles["column-dashboard-button-container"]}>
        <ModalButton isCancled={true}>취소</ModalButton>
        <ModalButton isComment={true}>생성</ModalButton>
      </div>
    </div>
  );
}
