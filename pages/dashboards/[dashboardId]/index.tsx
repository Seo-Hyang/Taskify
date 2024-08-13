// 기본 import
import styles from "./index.module.scss";
import Header from "@/components/Header/Header";
import SideMenu from "@/components/SideMenu/SideMenu";
import Head from "next/head";
import { useRouter } from "next/router";
import instance from "@/lib/axios";
import React, { useEffect, useState } from "react";
import { useDashboard } from "@/contexts/DashboardContext";

// 컴포넌트 import
import DashboardColumn from "@/components/DashboardColumns/DashboardColumns";
import AddButton from "@/components/Button/AddButton/AddButton";
import Column from "@/components/DashboardColumns/DashboardColumns";
import { getDashboard } from "@/services/dashboards";
import ColumnInvite from "@/components/Column/ColumnInvite";
import useInviteStore from "@/hooks/useInviteStore";
import useModalStore from "@/hooks/useModalStore";
import ColumnAdd from "@/components/Column/ColumnAdd";
import ToDoCreate from "@/components/Modal/ToDoCreate";
import ToDoModal from "@/components/Modal/TodoModal";

export type Column = {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
};

export default function DashBoard() {
  const router = useRouter();
  const { setDashboard } = useDashboard();
  const { dashboardId } = router.query;
  const { isShowModal, setIsShowModal } = useInviteStore();
  const { openModal } = useModalStore();

  //칼럼 목록
  const [columsList, setColumnList] = useState<Column[]>([]);

  async function getColumnList() {
    try {
      const res = await instance.get(
        `https://sp-taskify-api.vercel.app/7-1/columns?dashboardId=${dashboardId}`
      );
      const nextColumnList = res.data;
      const { result, data } = nextColumnList;

      setColumnList(data);
    } catch (err) {
      console.log("칼럼 조회에 실패했습니다.");
    }
  }

  async function setDashboardContext() {
    try {
      const dashboard = await getDashboard(Number(dashboardId));
      if (!dashboard) {
        console.error("Dashboard not found");
        return;
      }
      setDashboard({ id: Number(dashboardId), title: String(dashboard.title) });
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    }
  }

  useEffect(() => {
    setDashboardContext();
    getColumnList();
  }, [dashboardId]);

  const closeModal = () => {
    setIsShowModal(false);
  };

  const handleNewColumnClick = () => {
    openModal("columnAdd");
  };

  const handleColumnAdded = () => {
    getColumnList();
  };
  const handleUpdateColumns=()=>{
    getColumnList();
  }

  return (
    <>
      <div>
        <Head>
          <title>Taskify-대시보드</title>
        </Head>
      </div>
      <section>
        <SideMenu />
        <Header dashboardId={Number(dashboardId)} />
      </section>
      <section className={styles.dashboardContainer}>
        <section className={styles.dashboardColumns}>
          {columsList.map((item) => (
            <section key={item.id} className={styles.dashboardColumns}>
              <DashboardColumn
                dashboardId={Number(dashboardId)}
                columnId={item.id}
                onUpdateColumns={handleUpdateColumns}
              >
                {item.title}
              </DashboardColumn>
            </section>
          ))}
        </section>
        <div className={styles.add_newColumn}>
          <AddButton addColumn={true} onClick={handleNewColumnClick}>
            새로운 칼럼 추가하기
          </AddButton>
        </div>
      </section>
      <ColumnInvite
        dashboardId={Number(dashboardId)}
        isAttached={true}
        isShow={isShowModal}
        onClickCancle={closeModal}
      />
      <ColumnAdd
        dashboardId={Number(dashboardId)}
        onColumnAdded={handleColumnAdded}
      />
    </>
  );
}
