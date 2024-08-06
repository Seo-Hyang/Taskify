import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "./ColumnDelete.module.scss";
import { putcolumnDelete, getColumnAdd } from "@/lib/columnApi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
  columnId: string;
  dashboardId: string;
}

export default function ColumnDelete({ columnId, dashboardId }: Props) {
  const router = useRouter();
  const [columnIds,setColumnIds]=useState<string>("");

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await putcolumnDelete(columnId);
      router.push(`/dashboard/${dashboardId}`);
    } catch (err) {
      console.error("해당 칼럼 삭제에 실패했습니다.");
    }
  };

  //   칼럼 id 들고오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getColumnAdd(dashboardId);
        const columnIds = response.data.map(
          (column: { id: string }) => column.id
        );
        console.log(columnIds);
      } catch (error) {
        console.error("칼럼 ID를 가져오는데 실패했습니다.", error);
      }
    };

    fetchData();
  }, [dashboardId]);

  return (
    <div className={styles["column-delete"]}>
      <div className={styles["column-delete-container"]}>
        <h1 className={styles["column-delete-h1"]}>
          칼럼의 모든 카드가 삭제됩니다.
        </h1>
        <div className={styles["column-delete-button-container"]}>
          <ModalButton isCancled={true}>취소</ModalButton>
          <ModalButton isComment={true} onClick={handleDeleteClick}>
            삭제
          </ModalButton>
        </div>
      </div>
    </div>
  );
}
