import styles from "@/components/Button/DashboardButton/style.module.scss";
import CrownSVG from "@/public/icons/crown_icon.svg";

export default function DashboardButton({ children, isOwn = false }) {
  return (
    <>
      <button className={styles.container}>
        <section className={styles.contents}>
          <div className={styles.contents_color}></div>
          <section className={styles.contents_details}>
            <div className={styles.contents_name}>{children}</div>
            <CrownSVG
              className={`${styles.crownIcon} ${
                isOwn && styles.contents_isOwn
              }`}
            />
          </section>
        </section>
      </button>
    </>
  );
}
