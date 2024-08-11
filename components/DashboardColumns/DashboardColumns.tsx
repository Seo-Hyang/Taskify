//기본
import styles from "@/components/DashboardColumns/style.module.scss";
import instance from "@/lib/axios";
import React, { useEffect, useState } from "react";

//컴포넌트
import Cards from "@/components/Card/Card";
import AddButton from "@/components/Button/AddButton/AddButton";
//카드 타입 인터페이스
import { Card } from "@/types/Card";
import useModalStore from "@/hooks/useModalStore";
import ToDoCreate from "../Modal/ToDoCreate";

//대시보드 아이디 받아오기->칼럼 조회->칼럼 아이디 받아오기->카드 조회

export default function Column({
  children = "",
  columnId = 0,
  cardCounts = 0,
  dashboardId = 0,
}) {
  const [cardList, setCardList] = useState<Card[]>([]); //카드 목록
  const [totalCount, setTotalCount] = useState(0);
  const { openModal } = useModalStore();

  async function getCardList() {
    const res = await instance.get(
      `https://sp-taskify-api.vercel.app/7-1/cards?size=10&columnId=${columnId}`
    );
    const nextCardList = res.data;
    const { cards, totalCount, cursorId } = nextCardList;
    setTotalCount(totalCount);
    setCardList(cards);
  }

  useEffect(() => {
    getCardList();
  }, []);

  const handleCreateCardClick = (e: React.MouseEvent) => {
    openModal("createCard");
  };

  const handleCardDeleted = (deletedCardId: number) => {
    setCardList((prevCards) => prevCards.filter((card) => card.id !== deletedCardId));
    setTotalCount((prevCount) => prevCount - 1); // Optionally update totalCount
  };

  return (
    <div className={styles.container}>
      <section className={styles.column_title}>
        <div className={styles.column_color}></div>
        <div className={styles.column_name}>{children}</div>
        <div className={styles.cards_counts}>{totalCount}</div>
      </section>
      <section className={styles.cards}>
        <AddButton addTodo={true} onClick={handleCreateCardClick} columnId={columnId}/>
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
    </div>
  );
}
