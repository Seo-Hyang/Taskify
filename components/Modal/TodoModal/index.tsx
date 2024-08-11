import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "./ToDoModal.module.scss";
import Close from "@/public/icons/close_icon.svg";
import useWindowSize from "@/hooks/useDevice";
import { MOBILE_MAX_WIDTH } from "@/constants/screensize";
import Dropdown from "@/components/Dropdown";
import { useEffect, useState } from "react";
import { getCardId } from "@/lib/modalApi";
import { Modalcomment } from "./comment";
import { generateProfileImageUrl } from "@/lib/avatarsApi";
import { useTagColors } from "@/hooks/useTagColors";
import useModalStore from "@/hooks/useModalStore";
import Dialog from "../modal";
import { getColumnAdd } from "@/lib/columnApi";

interface Assignee {
  nickname: string;
  profileImageUrl: string | null;
}

interface CardData {
  id?:number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  assignee: Assignee;
  dueDate: string;
}

interface Props {
  id: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

export default function ToDoModal({
  id,
  cardId,
  columnId,
  dashboardId,
}: Props) {
  const { width } = useWindowSize();
  const { tagColors, addTagColor } = useTagColors();
  const [columnValues, setColumnValues] = useState({
    id: 0,
    title: "",
  });

  const [values, setValues] = useState<CardData>({
    title: "",
    description: "",
    tags: [],
    imageUrl: "",
    assignee: {
      nickname: "",
      profileImageUrl: "",
    },
    dueDate: "",
  });
  const { closeModal } = useModalStore();

  // 카드 정보 가져오기
  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await getCardId(cardId);
        response.tags.forEach((tag) => addTagColor(tag));
        setValues({
          title: response.title,
          description: response.description,
          tags: response.tags,
          imageUrl: response.imageUrl,
          dueDate: response.dueDate,
          assignee: {
            nickname: response.assignee.nickname,
            profileImageUrl: response.assignee.profileImageUrl || "",
          },
        });
      } catch (error) {
        console.error("카드를 가져올 수 없습니다:", error);
      }
    };

    fetchCard();
  }, []);

  // 대시보드 칼럼 목록 조회(칼럼 title과 id 들고와서) columnValues.id랑 columnId랑 같으면 columnValues.title 보여주기
  useEffect(() => {
    const fetchColumnTitle = async () => {
      try {
        const response = await getColumnAdd(dashboardId);
        const matchedColumn = response.data.find(
          (column:CardData) => column.id === columnId
        );
        if (matchedColumn) {
          setColumnValues({
            id: matchedColumn.id,
            title: matchedColumn.title,
          });
        } else {
          console.log("일치하는 컬럼을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.log("카드를 가져올 수 없습니다");
      }
    };
    fetchColumnTitle();
  }, []);

  const handleCancelClick = () => {
    closeModal(`${id}`);
  };

  console.log(columnId);
  console.log(columnValues.id);

  return (
    <Dialog id={`${id}`} className={styles["dialog-container"]}>
      <div className={styles["todo-modal"]}>
        {width <= MOBILE_MAX_WIDTH ? (
          <>
            <div className={styles["todo-top-icon"]}>
              <Dropdown />
              <button
                className={styles["todo-button"]}
                onClick={handleCancelClick}
              >
                <Close width="32" height="32" alt="닫기" />
              </button>
            </div>
            <h1 className={styles["todo-h1"]}>{values.title}</h1>
          </>
        ) : (
          <>
            <div className={styles["todo-top"]}>
              <h1 className={styles["todo-h1"]}>{values.title}</h1>
              <div className={styles["todo-top-icon"]}>
                <Dropdown />
                <button
                  className={styles["todo-button"]}
                  onClick={handleCancelClick}
                >
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
                <div className={styles["todo-chip"]}>
                  {columnValues.title}
                </div>
              </div>
              <div className={styles["todo-chip-container-line"]}></div>
              <div className={styles["todo-chip-container-tag-container"]}>
                <div className={styles["todo-chip-container-tag"]}>
                  {values.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={styles.tag}
                      style={{
                        backgroundColor: tagColors[tag]?.backgroundColor,
                        color: tagColors[tag]?.color,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section className={styles["todo-description"]}>
              {values.description}
            </section>

            <img
              src={values.imageUrl}
              alt="카드 이미지"
              className={styles["todo-img"]}
            />
            <Modalcomment
              cardId={cardId}
              columnId={columnId}
              dashboardId={dashboardId}
            />
          </div>
          <section className={styles["todo-user-container"]}>
            <div
              className={`${styles["todo-user-container-top"]} ${styles["todo-margin"]}`}
            >
              <h2 className={styles["todo-user-top"]}>담당자</h2>
              <div className={styles["todo-user-img-container"]}>
                <img
                  src={
                    values.assignee.profileImageUrl
                      ? values.assignee.profileImageUrl
                      : generateProfileImageUrl(values.assignee.nickname)
                  }
                  alt="프로필 이미지"
                  className={styles["todo-user-img"]}
                />
                <span className={styles["todo-user-name"]}>
                  {values.assignee.nickname}
                </span>
              </div>
            </div>
            <div className={styles["todo-user-container-top"]}>
              <h2 className={styles["todo-user-top"]}>마감일</h2>
              <div className={styles["todo-user-name"]}>{values.dueDate}</div>
            </div>
          </section>
        </div>
      </div>
    </Dialog>
  );
}
