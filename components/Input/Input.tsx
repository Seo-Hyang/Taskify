import styles from "./style.module.scss";

interface Props {
  className?: string;
  placeholder: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function Input({
  className = "",
  placeholder,
  type,
  name,
  value,
  onChange,
  onKeyDown,
}: Props) {
  return (
    <input
      className={`${styles.Input} ${className}`}
      placeholder={placeholder}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}

export default Input;
