//기본 import
// import Header from "@/components/Header/Header";
// import SideMenu from "@/components/SideMenu/SideMenu";
import Head from "next/head";

//컴포넌트 import
import DashboardListButton from "@/components/Button/DashboardListButton/DashboardListButton";

export default function DashBoards() {
  return (
    <div>
      <section>
        <Head>
          <title>Taskify-대시보드</title>
        </Head>
        {/* <section>
          <SideMenu />
          <Header>내 대시보드</Header>
        </section> */}
      </section>
      <section>
        <DashboardListButton color="#000000" isOwn={true}>
          asd
        </DashboardListButton>
      </section>
    </div>
  );
}
