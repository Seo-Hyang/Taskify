import styles from "./style.module.scss";

function Label({ className = "", children, ...rest }) {
  return (
    <label className={`${styles.Label} ${className}`} {...rest}>
      {children}
    </label>
  );
}

export default Label;
