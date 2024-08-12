import styles from "@/components/Button/ArrowButton/style.module.scss";
import RIGHTARROWSVG from "@/public/icons/arrow_forward_icon.svg";
import { MouseEvent } from "react";

export default function ArrowButton({
  rightArrow = false,
  leftArrow = false,
  onClick = (e: MouseEvent<HTMLButtonElement>) => {},
}) {
  return (
    <button
      className={`${styles.Button} ${leftArrow ? styles.Arrowleft : ""}`}
      onClick={onClick}
    >
      <RIGHTARROWSVG
        className={`${rightArrow ? styles.ArrowRightSvg : ""} ${
          leftArrow ? styles.ArrowLeftSvg : ""
        }`}
      />
    </button>
  );
}
