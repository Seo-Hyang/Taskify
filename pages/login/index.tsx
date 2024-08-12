import { useState, ChangeEvent, FocusEvent, useEffect } from "react";
import styles from "./style.module.scss";
import Logo from "@/components/Logo/Logo";
import AuthButton from "@/components/Button/AuthButton/AuthButton";
import InputItem from "@/components/Input/InputItem";
import PasswordInput from "@/components/Input/PasswordInput";
import { LoginInputId, getErrorMessage } from "../authUtils";
import Link from "next/link";
import instance from "@/lib/axios";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/AlertModal";
import { AxiosError } from "axios";

interface FormState {
  email: string;
  password: string;
}

interface ErrorState {
  email?: string;
  password?: string;
}

function LoginPage() {
  const router = useRouter();

  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorState>({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [isGuestLogin, setIsGuestLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (isGuestLogin) {
      handleSubmitGuestLogin();
    }
  }, [formState]);

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
    if (!newErrors.email && !newErrors.password) {
      try {
        const { data } = await instance.post("/auth/login", {
          email,
          password,
        });

        const { accessToken } = data;
        localStorage.setItem("accessToken", accessToken);
        router.push("/dashboards");
      } catch (error) {
        if ((error as AxiosError).response?.status === 400) {
          console.error("로그인 실패: 비밀번호 불일치", error);
          setModalMessage("비밀번호가 일치하지 않습니다.");
          setIsModalOpen(true);
        } else if ((error as AxiosError).response?.status === 404) {
          console.error("로그인 실패: 사용자를 찾을 수 없음", error);
          setModalMessage("해당 사용자를 찾을 수 없습니다.");
          setIsModalOpen(true);
        } else if ((error as AxiosError).response?.status === 500) {
          console.error("서버 오류 발생:", error);
          setModalMessage(
            "서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요."
          );
          setIsModalOpen(true);
        } else {
          console.error("알 수 없는 오류 발생:", error);
        }
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormState({ email: "", password: "" });
  };

  const handleSubmitGuestLogin = async () => {
    try {
      const { email, password } = formState;
      const { data } = await instance.post("/auth/login", {
        email,
        password,
      });

      const { accessToken } = data;
      localStorage.setItem("accessToken", accessToken);
      router.push("/dashboards");
    } catch (error) {
      console.error("게스트 로그인 실패:", error);
      setModalMessage("게스트 로그인에 실패했습니다. 다시 시도해 주세요.");
      setIsModalOpen(true);
    } finally {
      setIsGuestLogin(false);
    }
  };

  const handleGuestLogin = () => {
    setFormState({ email: "TestDummy@email.com", password: "1234@pass" });
    setIsGuestLogin(true);
  };

  return (
    <div className={styles["container"]}>
      {isModalOpen && (
        <Modal message={modalMessage} onClose={handleCloseModal} />
      )}
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
          <AuthButton disabled={false} landing={false} className="authButton">
            로그인
          </AuthButton>
        </div>
      </form>
      <div className={styles.question}>
        회원이 아니신가요?{" "}
        <Link className={styles.Link} href="/signup">
          회원가입하기
        </Link>
        {" | "}
        <button className={styles.guestButton} onClick={handleGuestLogin}>
          게스트 로그인
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
