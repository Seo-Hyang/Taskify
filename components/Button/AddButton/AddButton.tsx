import styles from "@/components/Button/AddButton/style.module.scss";
import PLUSSVG from "@/public/icons/plus_icon.svg";

export default function ArrowButton({
  children,
  addBoard = false,
  addTodo = false,
  addColumn = false,
}) {
  return (
    <button
      className={`${styles.Button} ${addBoard && styles.add_board} ${
        addTodo && styles.add_todo
      } ${addColumn && styles.add_column}`}
    >
      {children}
      <div className={styles.plus_icon}>
        <PLUSSVG className={styles.plus_icon_svg} />
      </div>
    </button>
  );
}
