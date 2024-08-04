import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "./ColumnDelete.module.scss";

export default function ColumnDelete(){
    return(
        <div className={styles["column-delete"]}>
            <div className={styles["column-delete-container"]}>
            <h1 className={styles["column-delete-h1"]}>칼럼의 모든 카드가 삭제됩니다.</h1>
            <div className={styles["column-delete-button-container"]}>
                <ModalButton isCancled={true}>취소</ModalButton>
                <ModalButton isComment={true}>삭제</ModalButton>
            </div>
            </div>
        </div>
    )
}