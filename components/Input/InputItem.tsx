import { ChangeEvent, KeyboardEvent, FocusEvent } from "react";
import styles from "./style.module.scss";

interface InputItemProps {
  id: string;
  label: string;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder: string;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextArea?: boolean;
  errorMessage?: string;
  type?: string;
}

const InputItem: React.FC<InputItemProps> = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  onKeyDown,
  isTextArea,
  errorMessage,
  type = "text",
}) => {
  return (
    <div>
      {label && (
        <label className={styles.Label} htmlFor={id}>
          {label}
        </label>
      )}

      {isTextArea ? (
        <input
          id={id}
          className={`${styles.Input} ${errorMessage ? styles.InputError : ""}`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={id}
          className={`${styles.Input} ${errorMessage ? styles.InputError : ""}`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          type={type}
        />
      )}

      {errorMessage && (
        <div className={styles.ErrorMessage}>{errorMessage}</div>
      )}
    </div>
  );
};

export default InputItem;
