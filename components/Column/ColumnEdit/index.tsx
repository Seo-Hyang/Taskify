import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "../Column.module.scss";
import Close_modal from "@/public/icons/modal_close.svg";
import Close_modal_mobile from "@/public/icons/modal_close_mobile.svg";
import { MOBILE_MAX_WIDTH } from "@/constants/screensize";
import useWindowSize from "@/hooks/useDevice";

export default function ColumnEdit() {
  const { width } = useWindowSize();
  return (
    <div className={styles["column-auth"]}>
      <div className={styles["column-auth-container"]}>
        <div className={styles["column-container-close"]}>
          <h1 className={styles["column-h1"]}>칼럼 관리</h1>
          <button className={styles["column-close-button"]}>
            {width > MOBILE_MAX_WIDTH ? (
              <Close_modal width="36" height="36" />
            ) : (
              <Close_modal_mobile width="24" height="24" />
            )}
          </button>
        </div>
        <div className={styles["column-add-label-container"]}>
          <label className={styles["column-label"]}>이름</label>
          <input></input>
        </div>
        <div className={styles["column-button-container"]}>
          <ModalButton isCancled={true}>삭제</ModalButton>
          <ModalButton isComment={true}>변경</ModalButton>
        </div>
      </div>
    </div>
  );
}
