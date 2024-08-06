// 기본 import
import React from "react";
import styles from "./_SideMenu.module.scss";

// 컴포넌트 import
import ArrowButton from "../Button/ArrowButton/ArrowButton";
import DashboardButton from "@/components/Button/DashboardButton/DashboardButton";
// 이미지 import
import Logo from "@/public/images/logo/large.svg";
import LogoSmall from "@/public/images/logo/small.svg";
import AddIcon from "@/public/images/addIcon.svg";

export default function SideMenu() {
  return (
    <>
      <div className={styles.sideMenuContainer}>
        <div className={styles.sideMenuContentBox}>
          <div className={styles.sideMenuContentHeader}>
            <Logo className={styles.sideMenuLogo} />
            <LogoSmall className={styles.sideMenu_LogoSmall} />
          </div>
          <div className={styles.addDashBoard}>
            <span className={styles.dashboard_name}>Dash Boards</span>
            <AddIcon />
          </div>
          <section className={styles.sideMenuContent}>
            <DashboardButton isOwn={true}>비브리지</DashboardButton>
            <DashboardButton isOwn={true}>코드잇</DashboardButton>
            <DashboardButton>회의록</DashboardButton>
            <DashboardButton>어쩌구</DashboardButton>
            <DashboardButton>저쩌구</DashboardButton>
          </section>
          <section className={styles.arrowButtons}>
            <ArrowButton leftArrow />
            <ArrowButton rightArrow />
          </section>
        </div>
      </div>
    </>
  );
}
