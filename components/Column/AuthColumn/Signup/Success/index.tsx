import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "../Auth.module.scss";

export default function MypaeModal() {
  return (
    <div className={styles["auth-column"]}>
      <div className={styles["auth-column-container"]}>
        <h1 className={styles["auth-column-h1"]}>가입이 완료되었습니다!</h1>
        <ModalButton isComment={true}>확인</ModalButton>
      </div>
    </div>
  );
}
