import styles from "@/components/DashboardColumns/style.module.scss";
import Card from "@/components/Card/Card";
import AddButton from "@/components/Button/AddButton/AddButton";

export default function Column({ children, columnColor = "", cardCounts = 0 }) {
  return (
    <>
      <div className={styles.container}>
        <section className={styles.column_title}>
          <div className={styles.column_color}></div>
          <div className={styles.column_name}>{children}</div>
          <div className={styles.cards_counts}>{cardCounts}</div>
        </section>
        <section className={styles.cards}>
          <AddButton addTodo={true} />
          <Card />
          <Card isImage={true} />
        </section>
      </div>
    </>
  );
}
