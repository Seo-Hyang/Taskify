import { useState, ChangeEvent, FocusEvent } from "react";
import styles from "./style.module.scss";
import AuthButton from "@/components/Button/AuthButton/AuthButton";
import Logo from "@/components/Logo/Logo";
import InputItem from "@/components/Input/InputItem";
import PasswordInput from "@/components/Input/PasswordInput";
import { SignupInputId, getErrorMessage } from "../authUtils";
import Link from "next/link";
import axios from "axios";

interface FormState {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

interface ErrorState {
  email?: string;
  nickname?: string;
  password?: string;
  passwordConfirmation?: string;
}

// TODO: instance 위치 수정하기
export const instance = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app/7-1",
});

function SignUpPage() {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errors, setErrors] = useState<ErrorState>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    const errorMessage = getErrorMessage(
      id as SignupInputId,
      value,
      formState.password
    );
    setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, nickname, password } = formState;

    console.log({ email, password });
    const data = await instance.post("/users", {
      email,
      nickname,
      password,
    });
    console.log({ data });

    const newErrors = {
      email: getErrorMessage("email", formState.email),
      nickname: getErrorMessage("nickname", formState.nickname),
      password: getErrorMessage("password", formState.password),
      passwordConfirmation: getErrorMessage(
        "passwordConfirmation",
        formState.passwordConfirmation,
        formState.password
      ),
    };

    setErrors(newErrors);
    // async function handleSubmit(e) {
    //   e.preventDefault();

    //   if (values.password !== values.passwordRepeat) {
    //     // toast("warn", "비밀번호가 일치하지 않습니다.");
    //     alert("비밀번호가 일치하지 않습니다.");
    //     return;
    //   }
    //   const { name, email, password } = values;
    //   console.log({ name, email, password });
    //   // api를 요청하는 코드: fetch vs axios
    //   // fetch: 자바스크립트 기본 제공해주는 함수
    //   // axios: 설치해야 됨
    //   // await axios.post("/users", { name, email, password });

    //   // API 로 회원정보를 저장할거야
    //   // https://sp-taskify-api.vercel.app/7-1/users
    //   const data = await instance.post("/users", {
    //     email,
    //     nickname: name,
    //     password,
    //   });
    //   console.log({ data });
    // const response = await fetch(
    //   "https://sp-taskify-api.vercel.app/7-1/users",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       accept: "application/json",
    //     },
    //     body: JSON.stringify({
    //       email,
    //       nickname: name,
    //       password,
    //     }),
    //   }
    // );
    // const data = await response.json();
    // console.log({ data });
    // if (response.ok) {
    //   console.log({ data });
    //   return data;
    // } else {
    //   console.log(response);
    // }

    /**
     * @TODO
     * 서버에 회원을 생성한다
     * 회원 생성이 성공하면 로그인을 시도한다
     * 로그인이 성공하면 `/me`로 이동한다
     */
  };

  return (
    <div className={styles["container"]}>
      <Logo text="첫 방문을 환영합니다!" />
      <form className={styles.Form} method="post" onSubmit={handleSubmit}>
        <InputItem
          id="email"
          label="이메일"
          value={formState.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="이메일을 입력해 주세요"
          errorMessage={errors.email}
        />

        <InputItem
          id="nickname"
          label="닉네임"
          value={formState.nickname}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="닉네임을 입력해 주세요"
          errorMessage={errors.nickname}
        />

        <PasswordInput
          id="password"
          label="비밀번호"
          value={formState.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="비밀번호를 입력해 주세요"
          errorMessage={errors.password}
        />

        <PasswordInput
          id="passwordConfirmation"
          label="비밀번호 확인"
          value={formState.passwordConfirmation}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="비밀번호를 다시 한 번 입력해 주세요"
          errorMessage={errors.passwordConfirmation}
        />

        <div className={styles["checkbox-container"]}>
          <label htmlFor="term" />
          <input id="term" type="checkbox" /> <p>이용약관에 동의합니다.</p>
        </div>
        <div className={styles["button-container"]}>
          <AuthButton>회원가입</AuthButton>
        </div>
      </form>
      <div className={styles["question"]}>
        이미 회원이신가요?{" "}
        <Link className={styles.Link} href="/LoginPage">
          로그인하기
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;
