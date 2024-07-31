import styles from "@/components/Button/AuthButton/style.module.scss";

export default function AuthButton({
  children,
  disabled = false,
  landing = false,
}) {
  return (
    <button
      className={`${styles.Button} ${landing && styles.landing}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
