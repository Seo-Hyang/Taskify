import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "./ToDoModal.module.scss";
import Close from "@/public/icons/close_icon.svg";
import useWindowSize from "@/hooks/useDevice";
import { MOBILE_MAX_WIDTH } from "@/constants/screensize";
import Dropdown from "@/components/Dropdown";
import { useEffect, useState } from "react";
import {
  deleteComment,
  getCardId,
  getComment,
  postComment,
  putComment,
} from "@/lib/modalApi";
import { generateProfileImageUrl } from "@/lib/avatarsApi";
import { Modalcomment } from "./comment";

interface Assignee {
  nickname: string;
  profileImageUrl: string | null;
}

interface CardData {
  title: string;
  description: string;
  imageUrl: string;
  assignee: Assignee;
  dueDate: string;
}

export default function ToDoModal() {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);

  // return (
  //   <div className={styles.app}>
  //     <button className={styles.openModalButton} onClick={openModal}>
  //       <OpenModalButton width="24" height="24" alt="Open Modal" />
  //     </button>
  //     <Modal isOpen={isModalOpen} onClose={closeModal} />
  //   </div>
  // 모달이 필요한 컴포넌트에 적용하기(예시));

  const { width } = useWindowSize();

  const [vaules, setValues] = useState<CardData>({
    title: "",
    description: "",
    // columnId:"",
    // tags:"",
    imageUrl: "",
    assignee: {
      nickname: "",
      profileImageUrl: null,
    },
    dueDate: "",
  });
  // if (!isOpen) return null;

  // 카드 정보 가져오기
  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await getCardId("9826");
        setValues({
          title: response.title,
          description: response.description,
          imageUrl: response.imageUrl,
          assignee: {
            nickname: response.assignee.nickname,
            profileImageUrl: response.assignee.profileImageUrl,
          },
          dueDate: response.dueDate,
        });
      } catch (error) {
        console.error("카드를 가져올 수 없습니다:", error);
      }
    };

    fetchCard();
  }, []);

  return (
    <div className={styles["todo-modal"]}>
      {width <= MOBILE_MAX_WIDTH ? (
        <>
          <div className={styles["todo-top-icon"]}>
            <Dropdown />
            <button className={styles["todo-button"]}>
              <Close width="32" height="32" alt="닫기" />
            </button>
          </div>
          <h1 className={styles["todo-h1"]}>{vaules.title}</h1>
        </>
      ) : (
        <>
          <div className={styles["todo-top"]}>
            <h1 className={styles["todo-h1"]}>{vaules.title}</h1>
            <div className={styles["todo-top-icon"]}>
              <Dropdown />
              <button className={styles["todo-button"]}>
                <Close width="32" height="32" alt="닫기" />
              </button>
            </div>
          </div>
        </>
      )}

      <div className={styles["todo-column"]}>
        <div>
          <section className={styles["todo-chip-container"]}>
            <div className={styles["todo-chip-container-state"]}>
              <div className={styles["todo-chip-circle"]}></div>
              <div className={styles["todo-chip"]}></div>
              {/* chip 넣기 */}
            </div>
            <div className={styles["todo-chip-container-line"]}></div>
            <div className={styles["todo-chip-container-tag-container"]}>
              <div className={styles["todo-chip-container-tag"]}></div>
              {/* tag 넣기 */}
            </div>
          </section>

          <section className={styles["todo-description"]}>
            {vaules.description}
          </section>

          <img
            src={vaules.imageUrl}
            alt="카드 이미지"
            className={styles["todo-img"]}
          />
          <Modalcomment />
        </div>
        <section className={styles["todo-user-container"]}>
            <div
              className={`${styles["todo-user-container-top"]} ${styles["todo-margin"]}`}
            >
              <h2 className={styles["todo-user-top"]}>담당자</h2>
              <div className={styles["todo-user-img-container"]}>
                {vaules.assignee.profileImageUrl ? (
                  <img
                    src={vaules.assignee.profileImageUrl}
                    alt="프로필 이미지"
                    className={styles["todo-user-img"]}
                  />
                ) : (
                  <div className={styles["todo-user-img-placeholder"]}>
                  {/* <img src={} alt="담당자 프로필" /> */}
                  </div>
                )}
                <span className={styles["todo-user-name"]}>
                  {vaules.assignee.nickname}
                </span>
              </div>
            </div>
            <div className={styles["todo-user-container-top"]}>
              <h2 className={styles["todo-user-top"]}>마감일</h2>
              <div className={styles["todo-user-name"]}>{vaules.dueDate}</div>
            </div>
          </section>
      </div>
    </div>
  );
}
