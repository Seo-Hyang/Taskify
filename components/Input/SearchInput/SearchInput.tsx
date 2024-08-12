import { ChangeEvent, KeyboardEvent, FocusEvent } from "react";
import styles from "./style.module.scss";
import SearchSVG from "@/public/icons/search_icon.svg";

interface InputItemProps {
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder: string;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  isTextArea?: boolean;
  errorMessage?: string;
  type?: string;
}

const SearchInputItem: React.FC<InputItemProps> = ({
  value,
  onChange,
  placeholder,
  onKeyDown,
  isTextArea,
  errorMessage,
  type = "text",
}) => {
  return (
    <div>
      <div className={styles.SVG_Container}>
        <SearchSVG className={styles.SVG} />
      </div>
      {isTextArea ? (
        <input
          className={`${styles.Input} ${errorMessage ? styles.InputError : ""}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={`${styles.Input} ${errorMessage ? styles.InputError : ""}`}
          value={value}
          onChange={onChange}
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

export default SearchInputItem;
