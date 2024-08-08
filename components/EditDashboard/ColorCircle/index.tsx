import styles from "./index.module.scss";
import CheckIcon from "@/public/icons/check_icon.svg";
import { DashboardColor } from "@/types/dashboard-color";
import { MouseEvent, Dispatch, SetStateAction } from "react";

interface Props {
  color: DashboardColor;
  checked: boolean;
  setColor: Dispatch<SetStateAction<DashboardColor>>;
}

export default function ColorCircle({ color, checked, setColor }: Props) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setColor(color);
  };

  return (
    <>
      <div className={styles.colorCircle}>
        <button onClick={handleClick}>
          <div className={`${styles.circle} ${styles[color]}`}>
            {checked && <CheckIcon className={styles.iconCheck} />}
          </div>
        </button>
      </div>
    </>
  );
}
