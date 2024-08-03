// 기본 import
import React, { useState, useEffect } from "react";
import styles from "./_MyPage.module.scss";
import Head from "next/head";
import SideMenu from "@/components/SideMenu/SideMenu";

// 컴포넌트 import
import Header from "@/components/Header/Header";
import Button from "@/components/Button/Button/Button";
import ReturnButton from "@/components/Button/ReturnButton/ReturnButton";

// 이미지 import
import AddPicture from "@/public/images/AddPicture.svg";

export default function MyPage() {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (
      currentPassword.length > 0 &&
      newPassword.length > 0 &&
      confirmNewPassword.length > 0
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [currentPassword, newPassword, confirmNewPassword]);

  return (
    <>
      <Head>
        <title>Taskify-마이페이지</title>
      </Head>

      <header>
        <nav>
          <Header>계정관리</Header>
        </nav>
      </header>

      <main>
        <aside>
          <SideMenu />
        </aside>

        <div className={styles.userManagementContainer}>
          {/* 돌아가기 버튼 */}
          <ReturnButton w="84px" h="26px" b="none">
            돌아가기
          </ReturnButton>

          {/* 프로필 설정 박스 */}
          <div className={styles.profileContainer}>
            <span className={styles.profileHeader}>프로필</span>
            <div className={styles.profileBox}>
              <div className={styles.profilePicture}>
                <AddPicture />
              </div>
              <div className={styles.width}>
                <div className={styles.profileInputContainer}>
                  <div>
                    <span className={styles.inputName}>이메일</span>
                    <h3 className={styles.noti}>
                      *이메일은 변경 불가 항목입니다.
                    </h3>
                    <input className={styles.Input} placeholder="e-mail" />
                  </div>
                  <div>
                    <span className={styles.inputName}>닉네임</span>
                    <input className={styles.Input} placeholder="nickname" />
                  </div>
                </div>
                <Button h="50px" m="24px 0 0">
                  저장
                </Button>
                {/*<div className={styles.submitButton}>저장</div>*/}
              </div>
            </div>
          </div>

          {/* 비밀번호 변경 박스 */}
          <div className={styles.passwordContainer}>
            <span className={styles.profileHeader}>비밀번호 변경</span>
            <div className={styles.profileBox}>
              <div className={styles.width}>
                <div className={styles.passwordInputContainer}>
                  <div>
                    <span className={styles.inputName}>현재 비밀번호</span>
                    <input
                      className={styles.Input}
                      placeholder="현재 비밀번호 입력"
                    />
                  </div>
                  <div>
                    <span className={styles.inputName}>새 비밀번호</span>
                    <input
                      className={styles.Input}
                      placeholder="새 비밀번호 입력"
                    />
                  </div>
                  <div>
                    <span className={styles.inputName}>새 비밀번호 확인</span>
                    <input
                      className={styles.Input}
                      placeholder="새 비밀번호 입력"
                    />
                  </div>
                </div>
                <Button h="50px" m="24px 0 0">
                  변경
                </Button>
                {/*<div className={styles.submitButton}>변경</div>*/}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
