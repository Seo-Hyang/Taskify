import styles from "@/components/Button/AuthButton/style.module.scss";

export default function AuthButton({
  children,
  disabled = false,
  landing = false,
  className = "",
}) {
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
