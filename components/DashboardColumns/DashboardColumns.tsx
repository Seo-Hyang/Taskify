//기본
import styles from "@/components/DashboardColumns/style.module.scss";
import instance from "@/lib/axios";
import React, { useEffect, useState } from "react";
import SettigSVG from "@/public/icons/settings_icon.svg";

//컴포넌트
import Cards from "@/components/Card/Card";
import AddButton from "@/components/Button/AddButton/AddButton";

//칼럼 모달
import ColumnEdit from "@/components/Column/ColumnEdit/";

//카드 타입 인터페이스
import { Card } from "@/types/Card";
import useModalStore from "@/hooks/useModalStore";
import useEditModalStore from "@/hooks/useEditModalStore";
import ToDoCreate from "../Modal/ToDoCreate";

interface Props {
  children?: React.ReactNode;
  columnId: number;
  cardCounts?: number;
  dashboardId: number;
  onUpdateColumns: () => void;
}

export default function Column({
  children = "",
  columnId = 0,
  cardCounts = 0,
  dashboardId = 0,
  onUpdateColumns,
}: Props) {
  const [cardList, setCardList] = useState<Card[]>([]); //카드 목록
  const [totalCount, setTotalCount] = useState(0);
  const { openModal } = useModalStore();

  async function getCardList() {
    try {
      const res = await instance.get(
        `https://sp-taskify-api.vercel.app/7-1/cards?size=50&columnId=${columnId}`
      );
      const nextCardList = res.data;
      const { cards, totalCount, cursorId } = nextCardList;
      setTotalCount(totalCount);
      setCardList(cards);
    } catch (err) {
      console.error("데이터를 가져오는 데 실패했습니다");
    }
  }

  useEffect(() => {
    getCardList();
  }, []);

  const handleCreateCardClick = (e: React.MouseEvent) => {
    openModal("createCard");
  };

  const handleCardDeleted = (deletedCardId: number) => {
    setCardList((prevCards) =>
      prevCards.filter((card) => card.id !== deletedCardId)
    );
    setTotalCount((prevCount) => prevCount - 1); // Optionally update totalCount
  };

  const handleEditColumn = (e: React.MouseEvent) => {
    openModal("editColumn");
  };

  const handleCardCreated = (newCard: Card) => {
    setCardList((prevCards) => [newCard, ...prevCards]);
    setTotalCount((prevCount) => prevCount + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.column_top}>
        <section className={styles.column_title}>
          <div className={styles.column_color}></div>
          <div className={styles.column_name}>{children}</div>
          <div className={styles.cards_counts}>{totalCount}</div>
        </section>
        <button onClick={handleEditColumn} className={styles.columns_edit}>
          <SettigSVG className={styles.columns_editSvg} />
        </button>
      </div>

      <section className={styles.cards}>
        <AddButton
          addTodo={true}
          onClick={handleCreateCardClick}
          columnId={columnId}
        />
        {cardList.map((item) => (
          <Cards
            key={item.id}
            id={item.id}
            title={item.title}
            tags={item.tags}
            dueDate={item.dueDate}
            imageUrl={item.imageUrl}
            userEmail={item.assignee.nickname}
            columnId={columnId}
            dashboardId={dashboardId}
            onCardDeleted={handleCardDeleted}
          />
        ))}
      </section>
      <ToDoCreate dashboardId={dashboardId} columnId={columnId} />
      <ColumnEdit
        dashboardId={dashboardId}
        columnId={columnId}
        onUpdateColumns={onUpdateColumns}
      />
    </div>
  );
}
