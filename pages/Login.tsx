import { useState } from "react";
import styles from "./Login.module.scss";
import logoImage from "@/public/images/logo/main.svg";
import Image from "next/image";
import AuthButton from "@/components/Button/AuthButton/AuthButton";

function Login() {
  return (
    <div className={styles["container"]}>
      <div>
        <Image src={logoImage} alt="로고 이미지" />
        <h1>오늘도 만나서 반가워요!</h1>
      </div>
      <div className={styles["login-container"]}>
        <h2>이메일</h2>
        <input></input>
        <h2>비밀번호</h2>
        <input></input>
        <AuthButton />
        <h2>회원이 아니신가요? 회원가입하기</h2>
      </div>
    </div>
  );
}

export default Login;
