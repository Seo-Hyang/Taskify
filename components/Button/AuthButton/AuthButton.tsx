import styles from "@/components/Button/AuthButton/style.module.scss";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  disabled: boolean;
  landing?: boolean;
  className: string;
}

export default function AuthButton({
  children,
  disabled = false,
  landing = false,
  className = "",
}: Props) {
  return (
    <button
      className={`${styles.Button} ${
        landing ? styles.landing : ""
      } ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
