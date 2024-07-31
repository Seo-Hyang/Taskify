import styles from "./Footer.module.scss";
import Email from "@/public/icons/envelope_email_icon.svg";
import Insta from "@/public/icons/social_media_instagram_icon.svg";
import Facebook from "@/public/icons/social_media_facebook_icon.svg";
import { TABLET_MAX_WIDTH } from "@/constants/screensize";
import useWindowSize from "@/hooks/useDevice";

export default function Footer() {
  const { width } = useWindowSize();
  return (
    <div className={styles["footer-container"]}>
      {width >= TABLET_MAX_WIDTH ? (
        <>
          <span className={styles["footer-container-span"]}>@codeit-2023</span>
          <div className={styles["footer-container-span-container"]}>
            <span className={styles["footer-container-span"]}>
              Privacy Policy
            </span>
            <span className={styles["footer-container-span"]}>FAQ</span>
          </div>
          <div className={styles["footer-container-img"]}>
            <Email alt="메일" width="20" height="20" />
            <Facebook alt="페이스북" width="22" height="22" />
            <Insta alt="인스타그램" width="22" height="22" />
          </div>{" "}
        </>
      ) : (
        <>
          <div className={styles["mobile-footer-container-span"]}>
            <span className={styles["footer-container-span"]}>
              @codeit-2023
            </span>
            <div className={styles["footer-container-span-container"]}>
              <span className={styles["footer-container-span"]}>
                Privacy Policy
              </span>
              <span className={styles["footer-container-span"]}>FAQ</span>
            </div>
          </div>
          <div className={styles["footer-container-img"]}>
            <Email alt="메일" width="20" height="20" />
            <Facebook alt="페이스북" width="22" height="22" />
            <Insta alt="인스타그램" width="22" height="22" />
          </div>
        </>
      )}
    </div>
  );
}
