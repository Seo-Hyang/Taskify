import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "../Column.module.scss";
import Close_modal from "@/public/icons/modal_close.svg";
import Close_modal_mobile from "@/public/icons/modal_close_mobile.svg";
import { MOBILE_MAX_WIDTH } from "@/constants/screensize";
import useWindowSize from "@/hooks/useDevice";
import { ChangeEvent, useEffect, useState } from "react";
import Input from "@/components/Input/ModalInput";
import { getColumnAdd, putcolumnDelete, putColumnEdit } from "@/lib/columnApi";
import { useRouter } from "next/router";
import Dialog from "@/components/Modal/modal";
import useModalStore from "@/hooks/useModalStore";

interface Props {
  columnId: number;
  title?: string;
  dashboardId: number;
  onUpdateColumns:()=>void;
}

export default function ColumnEdit({ columnId, dashboardId,onUpdateColumns }: Props) {
  const router = useRouter();
  const [newColumn, setNewColumn] = useState<string>("");
  const { width } = useWindowSize();
  const { closeModal } = useModalStore();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewColumn(e.target.value);
  };

  // 수정하기
  const handleEditClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await putColumnEdit(columnId, newColumn);
      closeModal("editColumn");
      onUpdateColumns();
    } catch (err) {
      console.error("해당 칼럼 수정에 실패했습니다.");
    }
  };

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await putcolumnDelete(columnId);
      closeModal("editColumn");
      onUpdateColumns();
    } catch (err) {
      console.error("해당 칼럼 삭제에 실패했습니다");
    }
  };

  const handleCancelClick = () => {
    closeModal("editColumn");
  };

  return (
    <Dialog id="editColumn" className={styles["dialog-container"]}>
      <div className={styles["column-auth"]}>
        <div className={styles["column-auth-container"]}>
          <div className={styles["column-container-close"]}>
            <h1 className={styles["column-h1"]}>칼럼 관리</h1>
            <button
              className={styles["column-close-button"]}
              onClick={handleCancelClick}
            >
              {width > MOBILE_MAX_WIDTH ? (
                <Close_modal width="36" height="36" />
              ) : (
                <Close_modal_mobile width="24" height="24" />
              )}
            </button>
          </div>
          <div className={styles["column-add-label-container"]}>
            <label className={styles["column-label"]}>이름</label>
            <Input value={newColumn} onChange={handleInputChange} />
          </div>
          <div className={styles["column-button-container"]}>
            <ModalButton isCancled={true} onClick={handleDeleteClick}>삭제</ModalButton>
            <ModalButton isComment={true} onClick={handleEditClick}>
              변경
            </ModalButton>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
