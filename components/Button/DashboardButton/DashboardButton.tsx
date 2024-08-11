import styles from "@/components/Button/DashboardButton/style.module.scss";
import CrownSVG from "@/public/icons/crown_icon.svg";
import { EventHandler, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  isOwn: boolean;
  color: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isCursorNow: boolean;

}

export default function DashboardButton({
  children,
  isOwn,
  color,
  onClick,
  isCursorNow,
}: ButtonProps) {
  console.log(isSelected);
  return (
    <button
className={`${styles.container} ${
        isCursorNow ? styles.container_cursor : ""
      }`}
      onClick={onClick}
    >
      <section className={styles.contents}>
        <div
          className={styles.contents_color}
          style={{ backgroundColor: `${color}` }}
        ></div>
        <div className={styles.contents_detailContainer}>
          <section className={styles.contents_details}>
            <div className={styles.contents_name}>{children}</div>
            <CrownSVG
              className={`${styles.crownIcon} ${
                isOwn ? styles.contents_isOwn : ""
              }`}
            />
          </section>
        </div>
      </section>
    </button>
  );
}
