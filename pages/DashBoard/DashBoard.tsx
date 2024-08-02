import styles from "@/pages/DashBoard/style.module.scss";
import Header from "@/components/Header/Header";
import SideMenu from "@/components/SideMenu/SideMenu";
import DashboardColumn from "@/components/DashboardColumns/DashboardColumns";
import AddButton from "@/components/Button/AddButton/AddButton";
import Head from "next/head";

export default function DashBoard() {
  return (
    <>
      <div>
        <Head>
          <title>Taskify-대시보드</title>
        </Head>
      </div>
      <section>
        <SideMenu />
        <Header userNickname="테스트" isOwner={true}>
          내 대시보드
        </Header>
      </section>
      <section className={styles.dashboardContainer}>
        <DashboardColumn cardCounts={3}>To Do</DashboardColumn>
        <DashboardColumn>On Progress</DashboardColumn>
        <div className={styles.add_newColumn}>
          <AddButton addColumn={true}>새로운 칼럼 추가하기</AddButton>
        </div>
      </section>
    </>
  );
}
