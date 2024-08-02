// 기본 import
import React from "react";
import styles from "./_MyPage.module.scss";
import Image from "next/image";
import Head from "next/head";
import SideMenu from "@/components/SideMenu/SideMenu";

// 컴포넌트 import
import Header from "@/components/Header/Header";

// 이미지 import

export default function MyPage() {
  return (
    <>
      <Head>
        <title>Taskify-마이페이지</title>
      </Head>

      <main>
        <SideMenu />
        <div className={styles.sideNav}>
          <div className={styles.header}>
            <Header>계정관리</Header>
          </div>
        </div>
      </main>
    </>
  );
}
