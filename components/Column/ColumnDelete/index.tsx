import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "./ColumnDelete.module.scss";
import { putcolumnDelete, getColumnAdd } from "@/lib/columnApi";
import useModalStore from "@/hooks/useModalStore";
import Dialog from "@/components/Modal/modal";

export default function ColumnDelete(columnId: number) {
  const {closeModal}=useModalStore();
  // 칼럼 삭제
  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await putcolumnDelete(columnId);
      closeModal();
    } catch (err) {
      console.error("해당 칼럼 삭제에 실패했습니다.");
    }
  };

  const handleCancelClick = ()=>{
    closeModal();
  }

  return (
    <Dialog>
    <div className={styles["column-delete"]}>
      <div className={styles["column-delete-container"]}>
        <h1 className={styles["column-delete-h1"]}>
          칼럼의 모든 카드가 삭제됩니다.
        </h1>
        <div className={styles["column-delete-button-container"]}>
          <ModalButton isCancled={true} onClick={handleCancelClick}>취소</ModalButton>
          <ModalButton isComment={true} onClick={handleDeleteClick}>
            삭제
          </ModalButton>
        </div>
      </div>
    </div>
    </Dialog>
  );
}
