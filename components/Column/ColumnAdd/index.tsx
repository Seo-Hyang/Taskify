import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "../Column.module.scss";
import Input from "@/components/Input/Input";
import { ChangeEvent, useEffect, useState } from "react";
import { getColumnAdd, postColumnAdd } from "@/lib/columnApi";
import { useRouter } from "next/router";

interface Props {
  dashboardId: string;
}

export default function ColumnAdd({ dashboardId }: Props) {
  const router = useRouter();
  const [columnName, setColumnName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [existingColumns, setExistingColumns] = useState<string[]>([]);
  const [columnLimitReached, setColumnLimitReached] = useState(false);
  const columnLimit = 10;

  // dashboardId를 가지고 오려면 현재 내가 어느 대시보드에 있는지를 알아야 하는데..내가 지금 아는건가?

  // 칼럼 이름이 빈 값인지
  useEffect(() => {
    setIsDisabled(columnName.trim() === "");
  }, [columnName]);

  // 기존의 칼럼 title 가져오기 & 칼럼 수 확인하기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getColumnAdd(dashboardId);
        const data = response.data;
        const titles = data.map((column: { title: string }) => column.title);
        setExistingColumns(titles);
        setColumnLimitReached(titles.length >= columnLimit);
      } catch (err) {
        console.error("기존 칼럼을 가져오는데 실패했습니다.");
      }
    };
    fetchData();
  }, [dashboardId]);

  // 기존의 칼럼 title과 columnName이 중복됐는지
  useEffect(() => {
    if (existingColumns.includes(columnName)) {
      setError("중복된 칼럼 이름입니다.");
    } else {
      setError(null);
    }
  }, [columnName, existingColumns]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColumnName(e.target.value);
  };

  // 생성
  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (columnName.trim() === "" || columnLimitReached) {
      setIsDisabled(true);
    }
    try {
      await postColumnAdd(columnName, dashboardId);
      setColumnName("");
      setError(null);
      router.push(`/dashboard/${dashboardId}`);
    } catch (err) {
      console.error("칼럼 생성에 실패했습니다.");
    }
  };

  return (
    <div className={styles["column-auth"]}>
      <div className={styles["column-auth-container"]}>
        <h1 className={styles["column-h1"]}>새 칼럼 생성</h1>
        <div className={styles["column-add-label-container"]}>
          <label className={styles["column-label"]}>이름</label>
          <Input
            placeholder="이름을 입력해주세요"
            value={columnName}
            onChange={handleInputChange}
          />
          {error && <div className={styles["error-message"]}>{error}</div>}
          {columnLimitReached && (
            <div className={styles["limit-error-message"]}>
              칼럼은 최대 {columnLimit}개까지 생성이 가능합니다.
            </div>
          )}
        </div>
        <div className={styles["column-button-container"]}>
          <ModalButton isCancled={true}>취소</ModalButton>
          <ModalButton
            isComment={true}
            isDisabled={isDisabled || !!error}
            onClick={handleSubmit}
          >
            생성
          </ModalButton>
        </div>
      </div>
    </div>
  );
}
