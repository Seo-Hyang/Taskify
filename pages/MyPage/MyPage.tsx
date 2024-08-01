// 기본 import
import React from "react";
import styles from "./_MyPage.module.scss";
import Image from "next/image";
import Head from "next/head";

// image import
import HeaderLogo from "@/public/images/logo/logo.svg";
import Management from "@/public/images/management.svg";
import Invite from "@/public/invite.svg";

export default function MyPage() {
  return (
    <>
      <Head>
        <title>Taskify-마이페이지</title>
      </Head>
      <div className={styles.header}>
        <div>
          <HeaderLogo width={108} height={33} alt="로고" />
        </div>
        <div>
          <Invite alt="초대 버튼" width={88} height={40} />
          <Management alt="관리 버튼" width={88} height={40} />
        </div>
      </div>
    </>
  );
}
