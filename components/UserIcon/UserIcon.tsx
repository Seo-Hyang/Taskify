import styles from "@/components/UserIcon/style.module.scss";

export default function UserIcon({ userEmail = "" }) {
  const firstLetter = userEmail[0].toUpperCase();
  return (
    <>
      <section className={styles.userIcon}>{firstLetter}</section>
    </>
  );
}
