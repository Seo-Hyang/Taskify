// 기본 import
import React, { useEffect, useState } from "react";
import styles from "./_SideMenu.module.scss";
import instance from "@/lib/axios";

// 컴포넌트 import
import ArrowButton from "../Button/ArrowButton/ArrowButton";
import DashboardButton from "@/components/Button/DashboardButton/DashboardButton";

// 이미지 import
import Logo from "@/public/images/logo/large.svg";
import LogoSmall from "@/public/images/logo/small.svg";
import AddIcon from "@/public/images/addIcon.svg";

export type Dashboard = {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
};

export default function SideMenu() {
  const [dashboardList, setDashboardList] = useState<Dashboard[]>([]); //대시모드 목록
  //const token = localStorage.getItem("accessToken"); //엑세스 토큰

  async function getDashboardList() {
    const res = await instance.get(
      "/dashboards?navigationMethod=pagination&page=1&size=10"
    );
    const nextDashboardList = res.data;
    const { dashboards, totalCount, cursorId } = nextDashboardList;

    setDashboardList(dashboards);
  }

  useEffect(() => {
    getDashboardList();
  }, []);

  return (
    <>
      <div className={styles.sideMenuContainer}>
        <div className={styles.sideMenuContentBox}>
          <div className={styles.sideMenuContentHeader}>
            <Logo className={styles.sideMenuLogo} />
            <LogoSmall className={styles.sideMenu_LogoSmall} />
          </div>
          <div className={styles.addDashBoard}>
            <div className={styles.dashboard_name}>Dash Boards</div>
            <AddIcon />
          </div>
          <div>
            {dashboardList.map((item) => (
              <section key={item.id} className={styles.sideMenuContent}>
                <DashboardButton isOwn={item.createdByMe}>
                  {item.title}
                </DashboardButton>
              </section>
            ))}
          </div>
          <section className={styles.arrowButtons}>
            <ArrowButton leftArrow />
            <ArrowButton rightArrow />
          </section>
        </div>
      </div>
    </>
  );
}
