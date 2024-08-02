import { useState } from "react";
import styles from "./SignUp.module.scss";
import logoImage from "@/public/images/logo/main.svg";
import Image from "next/image";
import AuthButton from "@/components/Button/AuthButton/AuthButton";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import Link from "next/link";

function SignUp() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (values.password !== values.passwordRepeat) {
      toast("warn", "비밀번호가 일치하지 않습니다.");
      return;
    }
    const { name, email, password } = values;
    /**
     * @TODO
     * 서버에 회원을 생성한다
     * 회원 생성이 성공하면 로그인을 시도한다
     * 로그인이 성공하면 `/me`로 이동한다
     */
  }

  return (
    <div className={styles["container"]}>
      <div>
        <Image src={logoImage} alt="로고 이미지" />
        <h1>오늘도 만나서 반가워요!</h1>
      </div>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <Label className={styles.Label} htmlFor="email">
          이메일
        </Label>
        <Input
          id="email"
          className={styles.Input}
          name="email"
          type="text"
          placeholder="이메일을 입력해 주세요"
          value={values.name}
          onChange={handleChange}
        />
        <Label className={styles.Label} htmlFor="name">
          닉네임
        </Label>
        <Input
          id="name"
          className={styles.Input}
          name="name"
          type="name"
          placeholder="닉네임을 입력해 주세요"
          value={values.email}
          onChange={handleChange}
        />
        <Label className={styles.Label} htmlFor="password">
          비밀번호
        </Label>
        <Input
          id="password"
          className={styles.Input}
          name="password"
          type="password"
          placeholder="8자 이상 입력해 주세요"
          value={values.password}
          onChange={handleChange}
        />
        <Label className={styles.Label} htmlFor="passwordRepeat">
          비밀번호 확인
        </Label>
        <Input
          id="passwordRepeat"
          className={styles.Input}
          name="passwordRepeat"
          type="password"
          placeholder="비밀번호를 한번 더 입력해 주세요"
          value={values.passwordRepeat}
          onChange={handleChange}
        />
        <div className={styles["checkbox-container"]}>
          <label htmlFor="term" />
          <input id="term" type="checkbox" />
          <p>이용약관에 동의합니다.</p>
        </div>
        <div className={styles["button-container"]}>
          <AuthButton>회원가입</AuthButton>
        </div>
        <div className={styles["question"]}>
          이미 회원이신가요?{" "}
          <Link className={styles.Link} href="/Login">
            로그인하기
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
