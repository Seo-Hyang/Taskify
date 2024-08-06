import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "../Column.module.scss";
import Close_modal from "@/public/icons/modal_close.svg";
import Close_modal_mobile from "@/public/icons/modal_close_mobile.svg";
import { MOBILE_MAX_WIDTH } from "@/constants/screensize";
import useWindowSize from "@/hooks/useDevice";
import { ChangeEvent, useEffect, useState } from "react";
import Input from "@/components/Input/Input";
import { getColumnAdd, putColumnEdit } from "@/lib/columnApi";
import { useRouter } from "next/router";

interface Props {
  columnId: string;
  title: string;
  dashboardId: string;
}

export default function ColumnEdit({ columnId, dashboardId }: Props) {
  const router = useRouter();
  const [existColumn, setExistColumn] = useState<string>("");
  // 여기서 해당 칼럼의 title을 초깃값으로
  const [newColumn, setNewColumn] = useState<string>("");
  const { width } = useWindowSize();

  // 해당 칼럼의 예전 title 들고오기
  useEffect(()=>{
    const fetchData=async ()=>{
      try{
        const response=await getColumnAdd(dashboardId);
        const columns=response.data;
        const column=columns.find((col: { id: number }) => col.id.toString() === columnId);
        if (column) {
          setExistColumn(column.title);
        } else {
          console.error("칼럼을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("칼럼을 가져오는 데 실패했습니다.", error);
      }
    };
    fetchData();
  },[dashboardId,columnId]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewColumn(e.target.value);
  };

  // 수정하기
  const handleEditClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await putColumnEdit(columnId, newColumn);
      router.push(`/dashboard/${dashboardId}`);
    } catch (err) {
      console.error("해당 칼럼 수정에 실패했습니다.");
    }
  };

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
          <Input value={newColumn} onChange={handleInputChange}/>
        </div>
        <div className={styles["column-button-container"]}>
          <ModalButton isCancled={true}>삭제</ModalButton>
          <ModalButton
            isComment={true}
            onClick={handleEditClick}
          >
            변경
          </ModalButton>
        </div>
      </div>
    </div>
  );
}
