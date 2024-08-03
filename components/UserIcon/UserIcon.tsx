import styles from "@/components/UserIcon/style.module.scss";

export default function UserIcon({ userEmail = "", isCard = false }) {
  const firstLetter = userEmail[0].toUpperCase();
  return (
    <>
      <section className={`${styles.userIcon} ${isCard && styles.cardIcon}`}>
        {firstLetter}
      </section>
    </>
  );
}
