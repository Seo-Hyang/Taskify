// 기본 import
import React, { useState, useEffect } from "react";
import styles from "./_MyPage.module.scss";
import Head from "next/head";
import SideMenu from "@/components/SideMenu/SideMenu";

// API import
import instance from "@/lib/axios";
import { changePassword, updateProfile } from "@/lib/modifyProfile";

// 컴포넌트 import
import Header from "@/components/Header/Header";
import Button from "@/components/Button/Button/Button";
import ReturnButton from "@/components/Button/ReturnButton/ReturnButton";
import MessageModal from "@/components/Modal/MessageModal";

/** // 요청 인터셉터 설정
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
*/

// 유저 정보 호출 함수
const getUserInfo = async () => {
  try {
    const response = await instance.get("/users/me");
    const userInfo = response.data;
    return userInfo;
  } catch (error) {
    console.error("유저 데이터를 불러오는데 실패했습니다.", error);
    throw error;
  }
};

// interface 설정
interface UserInfo {
  email: string;
  nickname: string;
  profileImageUrl?: string;
}

export default function MyPage() {
  // 프로필 이미지 state
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");

  // 닉네임 state
  const [profileNickname, setProfileNickname] = useState<string>("");

  // 비밀번호 state
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  // 비밀번호 불일치 알림 모달
  const [isModalDisabled, setIsModalDisabled] = useState(false);

  // 버튼 활성화 state
  const [isPasswordChangeDisabled, setIsPasswordChangeDisabled] =
    useState<boolean>(true);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] =
    useState<boolean>(true);

  // input 테두리 하이라이트 state
  const [isHightLight, setIsHightLight] = useState<boolean>(false);

  // 새 비밀번호 불일치 에러 state
  const [isNewPasswordError, setIsNewPasswordError] = useState<string>("");

  // 유저 정보 state
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    nickname: "",
  });

  // 비밀번호 변경 핸들러
  const handleChangePassword = async () => {
    try {
      await changePassword(currentPassword, newPassword);
      alert("비밀번호 변경 성공");
    } catch (error) {
      alert("비밀번호 변경 실패");
    }
  };

  // 프로필 닉네임, 사진 변경 핸들러
  const handleUpdateProfile = async () => {
    try {
      await updateProfile(profileNickname, profileImageUrl);
      alert("프로필 업데이트 성공");
    } catch (error) {
      alert("프로필 업데이트 실패");
    }
  };

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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setUserInfo(userInfo);
        setProfileNickname(userInfo.nickname);
      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    };

    fetchUserInfo();
  }, []);

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
                <input
                  type="file"
                  className={styles.addPictureInput}
                  value={profileImageUrl}
                ></input>
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
                      placeholder={userInfo.email || "E-mail"}
                      disabled
                    />
                  </div>
                  <div>
                    <span className={styles.inputName}>닉네임</span>
                    <input
                      className={styles.input}
                      placeholder="Nickname"
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
                  onClick={handleUpdateProfile}
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
                  onClick={handleChangePassword}
                >
                  변경
                </Button>
              </div>
            </div>
          </div>
        </div>
        <MessageModal
          onConfirm={(e) => {}}
          isShow={isModalDisabled}
          message="비밀번호가 일치하지 않습니다."
        />
      </main>
    </>
  );
}
