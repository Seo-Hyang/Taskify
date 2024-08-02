import styles from "@/components/CardTag/style.module.scss";

export default function CardTag({ children }) {
  return (
    <>
      <section className={styles.container}>
        <div className={styles.tag_text}>{children}</div>
      </section>
    </>
  );
}
