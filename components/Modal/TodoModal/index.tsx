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

interface Author {
  nickname: string;
  profileImageUrl: string | null;
}

interface CommentData {
  id: string;
  content: string;
  createdAt: string;
  author: Author;
}

function formatDate(isoString: string): string {
  const date = new Date(isoString);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
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
  const [commentValues, setCommentValues] = useState<CommentData[]>([]);
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");

  // if (!isOpen) return null;

  // 카드 정보 가져오기
  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await getCardId("9817");
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


  // 댓글 생성
  //   const commentClick=async (e:React.MouseEvent)=>{
  // try{
  //   await postComment(content,cardId,columnId,dashboardId);
  // }
  //   }

  // 댓글 조회
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await getComment(9817);
        setCommentValues(response.comments);
      } catch (err) {
        console.log("댓글을 가져올 수 없습니다:", err);
      }
    };
    fetchComment();
  }, []);

  // 댓글 수정
  // const handleEditClick = async (commentId: string, currentContent: string) => {
  //   setEditCommentId(8534);
  //   setEditedContent(currentContent);
  // };

  // 댓글 삭제
  const handleDeleteClick = async (commentId: string) => {
    try {
      await deleteComment(commentId);
    } catch (err) {
      console.error("댓글 삭제에 실패했습니다.");
    }
  };

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

          <div className={styles["todo-comment-input-container"]}>
            <span className={styles["todo-comment-span"]}>댓글</span>
            <div className={styles["todo-comment-input-text"]}>
              <textarea
                placeholder="댓글 작성하기"
                className={styles["todo-comment-text"]}
              />
              <div className={styles["todo-comment-button-container"]}>
                <button className={styles["todo-comment-button"]}>입력</button>
              </div>
            </div>
          </div>

          <section className={styles["todo-comment-container"]}>
            {commentValues.map((comment, index) => (
              <div
                key={comment.id}
                className={styles["todo-user-comment-container"]}
              >
                <img
                  src={comment.author.profileImageUrl || "프로필 이미지"}
                  alt="프로필 이미지"
                  className={styles["todo-user-comment-img"]}
                />
                <div className={styles["todo-user-comment-content"]}>
                  <div>
                    <div className={styles["todo-user-comment-container-name"]}>
                      <span
                        className={`${styles["todo-user-comment-auth"]} ${styles.name}`}
                      >
                        {comment.author.nickname}
                      </span>
                      <span
                        className={styles["todo-user-comment-auth-container"]}
                      >
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    {editCommentId === comment.id ? (
                      <>
                        <textarea
                          value={editedContent}
                          className={`${styles["todo-comment-text"]} ${styles["edited-comment"]}`}
                        />
                        <button>삭제</button>
                        <button>취소</button>
                        <button>입력</button>
                      </>
                    ) : (
                      <p
                        className={`${styles["todo-user-comment-auth"]} ${styles.content}`}
                      >
                        {comment.content}
                      </p>
                    )}
                  </div>
                  {editCommentId !== comment.id && (
                    <div className={styles["edit-container"]}>
                      <button
                        className={styles["todo-user-button"]}
                        onClick={() =>
                          handleEditClick(comment.id, comment.content)
                        }
                      >
                        <span
                          className={styles["todo-user-comment-auth-container"]}
                        >
                          수정
                        </span>
                      </button>
                      <button
                        className={styles["todo-user-button"]}
                        onClick={() => handleDeleteClick(comment.id)}
                      >
                        <span
                          className={styles["todo-user-comment-auth-container"]}
                        >
                          삭제
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </section>
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
                  No Profile Image
                  {/* 기본 이미지로 */}
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
