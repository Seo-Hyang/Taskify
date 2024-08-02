import styles from "./style.module.scss";

function Input({ className = "", children, ...rest }) {
  return (
    <input className={`${styles.Input} ${className}`} {...rest}>
      {children}
    </input>
  );
}

export default Input;
