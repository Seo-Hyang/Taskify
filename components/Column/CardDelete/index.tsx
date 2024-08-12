import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "../ColumnDelete/ColumnDelete.module.scss";
import { deleteCard } from "@/lib/modalApi";
import Dialog from "@/components/Modal/modal";
import useModalStore from "@/hooks/useModalStore";

interface Props{
  cardId:number;
  onCardDeleted: (cardId: number) => void;
}

export default function CardDelete({cardId,onCardDeleted}:Props) {
  const {closeModal}=useModalStore();
  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await deleteCard(cardId);
      closeModal("deletecard");
      onCardDeleted(cardId);
    } catch (err) {
      console.error("해당 카드 삭제에 실패했습니다.");
    }
  };
  const handleCancelClick = ()=>{
    closeModal("deletecard");
  }

  return (
    <Dialog id="deletecard" className={styles["dialog-container"]}>
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
