import styles from "./Footer.module.scss";
import email from "@/public/icons/envelope_email_icon.svg";
import insta from "@/public/icons/social_media_instagram_icon.svg";
import facebook from "@/public/icons/social_media_facebook_icon.svg";
import Image from "next/image";

export default function Footer() {
  return (
    <div className={styles["footer-container"]}>
      <span className={styles["footer-container-span"]}>@codeit-2023</span>

      <div className={styles["footer-container-span-container"]}>
        <span className={styles["footer-container-span"]}>Privacy Policy</span>
        <span className={styles["footer-container-span"]}>FAQ</span>
      </div>

      <div className={styles["footer-container-img"]}>
        <Image src={email} alt="메일" width="20" height="20" />
        <Image src={facebook} alt="페이스북" width="22" height="22" />
        <Image src={insta} alt="인스타그램" width="22" height="22" />
      </div>
    </div>
  );
}
