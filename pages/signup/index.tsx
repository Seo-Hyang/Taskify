import { useState, ChangeEvent, FocusEvent, useEffect } from "react";
import styles from "./style.module.scss";
import AuthButton from "@/components/Button/AuthButton/AuthButton";
import Logo from "@/components/Logo/Logo";
import InputItem from "@/components/Input/InputItem";
import PasswordInput from "@/components/Input/PasswordInput";
import { SignupInputId, getErrorMessage } from "../authUtils";
import Link from "next/link";
import instance from "@/lib/axios";
import { useRouter } from "next/navigation";
import Modal from "../login/components/Modal";
import { AxiosError } from "axios";

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

function SignUpPage() {
  const router = useRouter();

  const [formState, setFormState] = useState<FormState>({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errors, setErrors] = useState<ErrorState>({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/");
    }
  }, [router]);

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

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTermsAccepted(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isTermsAccepted) {
      setModalMessage("이용약관에 동의해야 회원가입이 가능합니다.");
      setIsModalOpen(true);
      return;
    }

    const { email, nickname, password } = formState;

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

    if (
      !newErrors.email &&
      !newErrors.nickname &&
      !newErrors.password &&
      !newErrors.passwordConfirmation
    ) {
      try {
        const data = await instance.post("/users", {
          email,
          nickname,
          password,
        });

        router.push("/LoginPage");
      } catch (error) {
        if ((error as AxiosError).response?.status === 409) {
          console.error("회원가입 실패:", error);
          setModalMessage("이미 가입한 계정이 있습니다.");
          setIsModalOpen(true);
        } else {
          console.error("알 수 없는 오류 발생:", error);
        }
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormState({
      email: "",
      nickname: "",
      password: "",
      passwordConfirmation: "",
    });
  };

  return (
    <div className={styles["container"]}>
      {isModalOpen && (
        <Modal message={modalMessage} onClose={handleCloseModal} />
      )}
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
          <input
            id="term"
            type="checkbox"
            checked={isTermsAccepted}
            onChange={handleCheckboxChange}
          />{" "}
          <p>이용약관에 동의합니다.</p>
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
