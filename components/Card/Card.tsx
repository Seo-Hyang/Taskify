import styles from "@/components/Card/style.module.scss";
import CardTag from "@/components/CardTag/CardTag";
//import UserIcon from "@/components/UserIcon/UserIcon";
import Image from "next/image";
import CardImage from "@/public/images/card_image2.png";
import CalendarSVG from "@/public/icons/calendar_today_icon.svg";
import useModalStore from "@/hooks/useModalStore";
import ToDoModal from "../Modal/TodoModal";
import { Cards } from "@/types/Card";

/**To-DO
 * 사용자 아이콘 표시
 *
 */

interface Props {
  id: number;
  title: string;
  tags: string[];
  dueDate: string;
  imageUrl: string;
  userEmail: string;
  columnId: number;
  dashboardId: number;
  onCardDeleted: (cardId: number) => void;
}

export default function Card({
  id = 0,
  title = "",
  tags = [""],
  dueDate = "",
  imageUrl = "",
  userEmail = "",
  columnId = 0,
  dashboardId = 0,
  onCardDeleted,
}: Props) {
  let cardDueDate = new Date(dueDate);
  let year = cardDueDate.getFullYear();
  let month = cardDueDate.getMonth();
  let date = cardDueDate.getDate();
  const { openModal } = useModalStore();

  const handleCardClick = () => {
    openModal(`${id}`);
  };

  return (
    <>
      <section className={styles.cardBox} onClick={handleCardClick}>
        <div className={styles.container}>
          {`${imageUrl}.length !==0` ? (
            <img
              src={imageUrl}
              alt="카드 이미지"
              width={500}
              height={300}
              className={styles.card_img}
            />
          ) : (
            <></>
          )}
          <section>
            <div className={styles.card_title}>{title}</div>
            <div className={styles.card_plans}>
              {`${tags}`.length !== 0 ? (
                <div className={styles.card_tags}>
                  {tags.map((item, index) => (
                    <CardTag key={index}>{item}</CardTag>
                  ))}
                </div>
              ) : (
                <></>
              )}
              <div className={styles.card_dateItems}>
                <CalendarSVG className={styles.calender_svg} />
                <div className={styles.card_date}>
                  {year}.{month}.{date}
                </div>
              </div>

              {/* <div className={styles.card_userIcon}>
                <UserIcon userEmail={userEmail} isCard={true} />
              </div> */}
            </div>
          </section>
        </div>
      </section>
      <ToDoModal
        id={`${id}`}
        cardId={id}
        columnId={columnId}
        dashboardId={dashboardId}
        onCardDeleted={onCardDeleted}
      />
    </>
  );
}
