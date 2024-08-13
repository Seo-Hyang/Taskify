import styles from "@/components/Button/ArrowButton/style.module.scss";
import RIGHTARROWSVG from "@/public/icons/arrow_forward_icon.svg";
import { MouseEvent } from "react";

interface Props {
  rightArrow?: boolean;
  leftArrow?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export default function ArrowButton({
  rightArrow,
  leftArrow,
  onClick,
  disabled,
}: Props) {
  return (
    <button
      className={`${styles.Button} ${leftArrow ? styles.Arrowleft : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <RIGHTARROWSVG
        className={`${rightArrow ? styles.ArrowRightSvg : ""} ${
          leftArrow ? styles.ArrowLeftSvg : ""
        }`}
      />
    </button>
  );
}
