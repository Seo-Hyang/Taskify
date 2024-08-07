//기본
import styles from "@/components/DashboardColumns/style.module.scss";
import instance from "@/lib/axios";
import React, { useEffect, useState } from "react";

//컴포넌트
import Card from "@/components/Card/Card";
import AddButton from "@/components/Button/AddButton/AddButton";

//대시보드 아이디 받아오기->칼럼 조회->칼럼 아이디 받아오기->카드 조회

export type Card = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;

  assignee: {
    id: number;
    nickname: string;
    profileImageUrl: string;
  };

  imageUrl: string;
  teamId: string;
  dashboardId: string;
  columnId: string;
  createdAt: string;
  updatedAt: string;
};

export default function Column({
  children = "",
  columnId = 0,
  cardCounts = 0,
}) {
  const [cardList, setCardList] = useState<Card[]>([]); //카드 목록
  const [totalCount, setTotalCount] = useState(0);

  async function getCardList() {
    const res = await instance.get(
      `https://sp-taskify-api.vercel.app/7-1/cards?size=10&columnId=${columnId}`
      //"https://sp-taskify-api.vercel.app/7-1/cards?size=10&columnId=38424"  확인용 데이터
    );
    const nextCardList = res.data;
    const { cards, totalCount, cursorId } = nextCardList;
    setTotalCount(totalCount);
    setCardList(cards);
  }

  useEffect(() => {
    getCardList();
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.column_title}>
        <div className={styles.column_color}></div>
        <div className={styles.column_name}>{children}</div>
        <div className={styles.cards_counts}>{totalCount}</div>
      </section>
      <section className={styles.cards}>
        <AddButton addTodo={true} />
        {cardList.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            tags={item.tags}
            dueDate={item.dueDate}
            imageUrl={item.imageUrl}
            userEmail={item.assignee.nickname}
          />
        ))}
      </section>
    </div>
  );
}
