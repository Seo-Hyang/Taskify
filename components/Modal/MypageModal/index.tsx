import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "./MypageModal.module.scss";

export default function MypaeModal(){
    return(
        <div className={styles["mypage-modal"]}>
            <div className={styles["mypage-modal-container"]}>
            <h1 className={styles["mypage-modal-h1"]}>비밀번호가 일치하지 않습니다.</h1>
            <ModalButton isComment={true}>확인</ModalButton>
            </div>
        </div>
    )
}