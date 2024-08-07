// 기본 import
import React, { useState, useEffect } from "react";
import styles from "./_MyPage.module.scss";
import Head from "next/head";
import SideMenu from "@/components/SideMenu/SideMenu";

// 컴포넌트 import
import Header from "@/components/Header/Header";
import Button from "@/components/Button/Button/Button";
import ReturnButton from "@/components/Button/ReturnButton/ReturnButton";

export default function MyPage() {
  // 닉네임 state
  const [profileNickname, setProfileNickname] = useState<string>("");

  // 비밀번호 state
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  // 버튼 활성화 state
  const [isPasswordChangeDisabled, setIsPasswordChangeDisabled] =
    useState<boolean>(true);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] =
    useState<boolean>(true);

  // input 테두리 하이라이트 state
  const [isHightLight, setIsHightLight] = useState<boolean>(false);

  // 새 비밀번호 불일치 에러 state
  const [isNewPasswordError, setIsNewPasswordError] = useState<string>("");

  useEffect(() => {
    // 닉네임 변경 버튼 활성화 조건문
    if (profileNickname.length > 0) {
      setIsSaveButtonDisabled(false);
    } else {
      setIsSaveButtonDisabled(true);
    }

    // 비밀번호 변경 버튼 활성화 조건문
    if (
      currentPassword.length > 0 &&
      newPassword.length > 0 &&
      confirmNewPassword.length > 0
    ) {
      setIsPasswordChangeDisabled(false);
    } else {
      setIsPasswordChangeDisabled(true);
    }

    // 변경 비밀번호 확인 조건문
    if (newPassword !== confirmNewPassword) {
      setIsHightLight(true);
      setIsNewPasswordError("새 비밀번호가 일치하지 않습니다.");
    } else {
      setIsHightLight(false);
      setIsNewPasswordError("");
    }
  }, [currentPassword, newPassword, confirmNewPassword, profileNickname]);

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
          <ReturnButton>돌아가기</ReturnButton>

          {/* 프로필 설정 박스 */}
          <div className={styles.profileContainer}>
            <span className={styles.profileHeader}>프로필</span>
            <div className={styles.profileBox}>
              <label className={styles.addPicture}>
                <input type="file" className={styles.addPictureInput}></input>
              </label>
              <div className={styles.profileContent}>
                <div className={styles.profileInputContainer}>
                  <div>
                    <span className={styles.inputName}>이메일</span>
                    <h3 className={styles.noti}>
                      *이메일은 변경 불가 항목입니다.
                    </h3>
                    <input
                      className={styles.input}
                      placeholder="e-mail"
                      disabled
                    />
                  </div>
                  <div>
                    <span className={styles.inputName}>닉네임</span>
                    <input
                      className={styles.input}
                      placeholder="nickname"
                      value={profileNickname}
                      onChange={(e) => setProfileNickname(e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  w="100%"
                  h="50px"
                  m="24px 0 0 0"
                  disabled={isSaveButtonDisabled}
                >
                  저장
                </Button>
              </div>
            </div>
          </div>

          {/* 비밀번호 변경 박스 */}
          <div className={styles.passwordContainer}>
            <span className={styles.profileHeader}>비밀번호 변경</span>
            <div>
              <div className={styles.width}>
                <div className={styles.passwordInputContainer}>
                  <div>
                    <span className={styles.inputName}>현재 비밀번호</span>
                    <input
                      className={styles.input}
                      placeholder="현재 비밀번호 입력"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      type="password"
                    />
                  </div>
                  <div>
                    <span className={styles.inputName}>새 비밀번호</span>
                    <input
                      className={`${styles.input} ${
                        isHightLight ? styles.hightLight : ""
                      }`}
                      placeholder="새 비밀번호 입력"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      type="password"
                    />
                  </div>
                  <div>
                    <span className={styles.inputName}>새 비밀번호 확인</span>
                    <div className={styles.newPassword}>
                      <input
                        className={`${styles.input} ${
                          isHightLight ? styles.hightLight : ""
                        }`}
                        placeholder="새 비밀번호 입력"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        type="password"
                      />
                      {isNewPasswordError && (
                        <span className={styles.error}>
                          {isNewPasswordError}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  h="50px"
                  m="24px 0 0"
                  disabled={isPasswordChangeDisabled}
                >
                  변경
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
