//기본 import
import Header from "@/components/Header/Header";
import SideMenu from "@/components/SideMenu/SideMenu";
import Head from "next/head";
import styles from "@/pages/dashboards/style.module.scss";
import { useEffect, useState } from "react";
import { Dashboard } from "@/types/dashboard";
import instance from "@/lib/axios";

//컴포넌트 import
import DashboardListButton from "@/components/Button/DashboardListButton/DashboardListButton";
import AddButton from "@/components/Button/AddButton/AddButton";
import PageButton from "@/components/Button/PageButton/PageButton";

/**
 * To do
 * 초대받은 목록 받아오기 -> 검색기능
 */

/**
 * 대시보드 id 로컬스토리지로 관리 -> currentDashboardId
 * 초기 세팅 : currentDashboardId = null
 * 버튼 클릭시 이동
 */

export default function DashBoards() {
  const [dashboardList, setDashboardList] = useState<Dashboard[]>([]); //대시모드 목록

  async function getDashboardList() {
    const res = await instance.get(
      "/dashboards?navigationMethod=pagination&page=1&size=6"
    );
    const nextDashboardList = res.data;
    const { dashboards, totalCount, cursorId } = nextDashboardList;

    setDashboardList(dashboards);
  }

  useEffect(() => {
    getDashboardList();
  }, []);

  return (
    <div>
      <section>
        <Head>
          <title>Taskify-대시보드</title>
        </Head>
        <section>
          <SideMenu />
          <Header>내 대시보드</Header>
        </section>
      </section>
      <section className={styles.dashboardContainer}>
        <section className={styles.dashboard_inner}>
          <section className={styles.dashboard_myListContainer}>
            <section className={styles.dashboard_myList}>
              <AddButton>새로운 대시보드</AddButton>
              {dashboardList.map((item) => (
                <DashboardListButton
                  key={item.id}
                  isOwn={item.createdByMe}
                  color={item.color}
                >
                  {item.title}
                </DashboardListButton>
              ))}
            </section>
            <div className={styles.dashboard_pageCursor}>
              페이지 수, 화살표 버튼
            </div>
            <hr></hr>
          </section>
          <section className={styles.dashboard_invitedList}>
            <section className={styles.dashboard_invitedTitle}>
              초대받은 대시보드
              <input type="text" />
            </section>
            <section className={styles.invited_list}>
              <div className={styles.dashboard_invitedColumnTitle}>
                <p className={styles.column_title}>이름</p>
                <p className={styles.column_inviter}>초대자</p>
                <p className={styles.column_button}>수락여부</p>
              </div>
              <section className={styles.dashboard_invitedContainer}>
                <div className={styles.invited_title}>대시보드 타이틀</div>
                <div className={styles.invited_inviter}>초대자</div>
                <div className={styles.dashboard_invitedButtons}>
                  <PageButton>수락</PageButton>
                  <PageButton isCancled={true}>거절</PageButton>
                </div>
              </section>
              <section className={styles.dashboard_invitedContainer}>
                <div className={styles.invited_title}>대시보드 타이틀</div>
                <div className={styles.invited_inviter}>초대자</div>
                <div className={styles.dashboard_invitedButtons}>
                  <PageButton>수락</PageButton>
                  <PageButton isCancled={true}>거절</PageButton>
                </div>
              </section>
            </section>
          </section>
        </section>
      </section>
    </div>
  );
}
