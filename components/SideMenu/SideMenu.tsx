// 기본 import
import React, { useEffect, useState } from "react";
import styles from "./_SideMenu.module.scss";
import instance from "@/lib/axios";

// 컴포넌트 import
import ArrowButton from "../Button/ArrowButton/ArrowButton";
import DashboardButton from "@/components/Button/DashboardButton/DashboardButton";
//대시보드 인터페이스
import { Dashboard } from "@/types/dashboard";

// 이미지 import
import Logo from "@/public/images/logo/large.svg";
import LogoSmall from "@/public/images/logo/small.svg";
import AddIcon from "@/public/images/addIcon.svg";
import { it } from "node:test";
import { useRouter } from "next/router";

export default function SideMenu() {
  const [dashboardList, setDashboardList] = useState<Dashboard[]>([]); //대시모드 목록
  const router = useRouter(); //라우터를 이용하여 페이지 이동(로컬스토리지의 현재대시보드 아이디에 따라)

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
  }, [dashboardList]);

  return (
    <>
      <div className={styles.sideMenuContainer}>
        <div className={styles.sideMenuContentBox}>
          <div className={styles.sideMenuContentHeader}>
            <a href="../../">
              <Logo className={styles.sideMenuLogo} />
              <LogoSmall className={styles.sideMenu_LogoSmall} />
            </a>
          </div>
          <div className={styles.addDashBoard}>
            <div className={styles.dashboard_name}>Dash Boards</div>
            <AddIcon />
          </div>
          <div>
            {dashboardList.map((item) => (
              <section key={item.id} className={styles.sideMenuContent}>
                <DashboardButton
                  isOwn={item.createdByMe}
                  color={item.color}
                  onClick={() => {
                    localStorage.setItem(
                      "currentDashboardId",
                      item.id.toString()
                    );
                    router.push(
                      `/dashboards/${localStorage.getItem(
                        "currentDashboardId"
                      )}`
                    );
                  }}
                >
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
