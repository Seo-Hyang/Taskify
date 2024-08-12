import { useState, ChangeEvent, FocusEvent, useEffect } from "react";
import styles from "./style.module.scss";
import Image from "next/image";

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  errorMessage?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  errorMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <label className={styles.Label} htmlFor={id}>
        {label}
      </label>

      <div className={styles["password-container"]}>
        <input
          id={id}
          className={`${styles.Input} ${errorMessage ? styles.InputError : ""}`}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
        />

        <button
          type="button"
          className={styles.Button}
          onClick={togglePasswordVisibility}
          aria-label="비밀번호 보기"
        >
          <Image
            width={24}
            height={24}
            src={
              showPassword
                ? "icons/visibility_icon.svg"
                : "icons/visibility_off_icon.svg"
            }
            alt="비밀번호 표시 상태 아이콘"
          />
        </button>
        {errorMessage && (
          <div className={styles.ErrorMessage}>{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
