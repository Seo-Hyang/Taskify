import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "../ColumnDelete/ColumnDelete.module.scss";
import { deleteCard } from "@/lib/modalApi";
import Dialog from "@/components/Modal/modal";
import useModalStore from "@/hooks/useModalStore";

export default function CardDelete(cardId: number) {
  const {closeModal}=useModalStore();
  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await deleteCard(cardId);
      closeModal();
    } catch (err) {
      console.error("해당 카드 삭제에 실패했습니다.");
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
          카드를 정말 삭제하시겠습니까?
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
