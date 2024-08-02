import styles from "@/components/Button/ArrowButton/style.module.scss";
import RIGHTARROWSVG from "@/public/icons/arrow_forward_icon.svg";

export default function ArrowButton({ rightArrow = false, leftArrow = false }) {
  return (
    <button className={`${styles.Button} ${leftArrow && styles.Arrowleft}`}>
      <RIGHTARROWSVG
        className={`${rightArrow && styles.ArrowRightSvg} ${
          leftArrow && styles.ArrowLeftSvg
        }`}
      />
    </button>
  );
}
