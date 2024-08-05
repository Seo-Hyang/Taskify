import { useState, ChangeEvent, FocusEvent } from "react";
import styles from "./style.module.scss";
import Logo from "@/components/Logo/Logo";
import AuthButton from "@/components/Button/AuthButton/AuthButton";
import InputItem from "@/components/Input/InputItem";
import PasswordInput from "@/components/Input/PasswordInput";
import { LoginInputId, getErrorMessage } from "../authUtils";
import Link from "next/link";
// TODO: import 위치 수정하기
import { instance } from "../SignUpPage";

interface FormState {
  email: string;
  password: string;
}

interface ErrorState {
  email?: string;
  password?: string;
}

function LoginPage() {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
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
    const errorMessage = getErrorMessage(id as LoginInputId, value);
    setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formState;
    const newErrors = {
      email: getErrorMessage("email", formState.email),
      password: getErrorMessage("password", formState.password),
    };

    setErrors(newErrors);

    console.log({ email, password });
    const data = await instance.post("/auth/login", {
      email,
      password,
    });
    console.log({ data });
    // const response = await fetch(
    //   "https://sp-taskify-api.vercel.app/7-1/auth/login",
    //   {
    //     method: "POST",
    //     body: JSON.stringify({
    //       email,
    //       password,
    //     }),
    //   }
    // );
    // const data = await response.json();
    // console.log({ data });
  };

  return (
    <div className={styles["container"]}>
      <Logo text="오늘도 만나서 반가워요!" />
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

        <PasswordInput
          id="password"
          label="비밀번호"
          value={formState.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="비밀번호를 입력해 주세요"
          errorMessage={errors.password}
        />
        <div className={styles["button-container"]}>
          <AuthButton>로그인</AuthButton>
        </div>
      </form>
      <div className={styles["question"]}>
        회원이 아니신가요?{" "}
        <Link className={styles.Link} href="/SignUpPage">
          회원가입하기
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
