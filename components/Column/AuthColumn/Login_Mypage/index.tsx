import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "../Auth.module.scss";

// Login & Mypage

export default function MypageModal(){
    return(
        <div className={styles["auth-column"]}>
            <div className={styles["auth-column-container"]}>
            <h1 className={styles["auth-column-h1"]}>비밀번호가 일치하지 않습니다.</h1>
            <ModalButton isComment={true} className={styles["auth-column-button"]}>확인</ModalButton>
            </div>
        </div>
    )
}