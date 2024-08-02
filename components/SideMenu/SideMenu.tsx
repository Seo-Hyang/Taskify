// 기본 import
import React from "react";
import styles from "./_SideMenu.module.scss";
import Image from "next/image";
import Head from "next/head";

// 컴포넌트 import
import ArrowButton from "../Button/ArrowButton/ArrowButton";

// 이미지 import
import Logo from "@/public/images/logo/logo.svg";
import Vector from "@/public/images/Vector.svg";

export default function SideMenu() {
  return (
    <>
      <div className={styles.sideMenuContainer}>
        <div className={styles.sideMenuContentBox}>
          <div className={styles.sideMenuContentHeader}>
            <Logo className={styles.sideMenuLogo} />
          </div>
          <div className={styles.addDashBoard}>
            <span style={{ display: "block" }}>Dash Boards</span>
            <Vector />
          </div>
          <div className={styles.sideMenuContent}>content</div>
          <div>
            <ArrowButton leftArrow />
            <ArrowButton rightArrow />
          </div>
        </div>
      </div>
    </>
  );
}
