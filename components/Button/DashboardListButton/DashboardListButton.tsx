import { ReactNode } from "react";
import styles from "@/components/Button/DashboardListButton/style.module.scss";
import CrownSVG from "@/public/icons/crown_icon.svg";
import ArrowSVG from "@/public/icons/arrow_forward_icon.svg";
// Props 타입 정의
interface DashboardListButtonProps {
  children: ReactNode;
  isOwn?: boolean;
  color: string;
}

export default function DashboardListButton({
  children,
  isOwn = false,
  color = "#000000",
}: DashboardListButtonProps) {
  return (
    <button className={styles.container}>
      <section className={styles.contents}>
        <div className={styles.contents_inner}>
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
        </div>
        <ArrowSVG className={styles.arrowIcon} />
      </section>
    </button>
  );
}
