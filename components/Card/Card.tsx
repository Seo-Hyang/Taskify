import styles from "@/components/Card/style.module.scss";
import CardTag from "@/components/CardTag/CardTag";
import UserIcon from "@/components/UserIcon/UserIcon";
import Image from "next/image";
import CardImage from "@/public/images/card_image2.png";
import CalendarSVG from "@/public/icons/calendar_today_icon.svg";

export default function Card({ isImage = false }) {
  return (
    <>
      <section className={styles.cardBox}>
        <div className={styles.container}>
          <Image
            src={CardImage}
            alt="카드 이미지"
            className={`${styles.card_imgContainer} ${
              isImage && styles.card_img
            }`}
          />
          <section>
            <div className={styles.card_title}>할일 이름</div>
            <div className={styles.card_plans}>
              <div className={styles.card_tags}>
                <CardTag>백엔드</CardTag>
                <CardTag>프로젝트</CardTag>
              </div>
              <div className={styles.card_dateItems}>
                <CalendarSVG className={styles.calender_svg} />
                <div className={styles.card_date}>2224.13.54</div>
              </div>
              <div className={styles.card_userIcon}>
                <UserIcon userEmail="test@email.com" isCard={true} />
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
