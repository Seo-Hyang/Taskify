import { ReactNode } from "react";
import styles from "@/components/Button/AddButton/style.module.scss";
import PLUSSVG from "@/public/icons/plus_icon.svg";

// Props 타입 정의
interface AddButtonProps {
  children?: ReactNode;
  addBoard?: boolean;
  addTodo?: boolean;
  addColumn?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function AddButton({
  children,
  addBoard = false,
  addTodo = false,
  addColumn = false,
  onClick,
}: AddButtonProps) {
  return (
    <button
      className={`${styles.Button} ${addBoard ? styles.add_board : ""} ${
        addTodo ? styles.add_todo : ""
      } ${addColumn ? styles.add_column : ""}`} onClick={onClick}
    >
      {children}
      <div className={styles.plus_icon}>
        <PLUSSVG className={styles.plus_icon_svg} />
      </div>
    </button>
  );
}
