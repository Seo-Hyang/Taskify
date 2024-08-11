import { useState, useEffect } from "react";
import styles from "./ToDoModal.module.scss";
import {
  postComment,
  getComment,
  deleteComment,
  putComment,
} from "@/lib/modalApi";
import { generateProfileImageUrl } from "@/lib/avatarsApi";

interface Author {
  nickname: string;
  profileImageUrl: string | null;
}

interface CommentData {
  id: number;
  content: string;
  updatedAt: string;
  author: Author;
}
interface ModalCommentProps {
  cardId: number;
  columnId: number;
  dashboardId: number;
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

export function Modalcomment({
  cardId,
  columnId,
  dashboardId,
}: ModalCommentProps) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [commentValues, setCommentValues] = useState<CommentData[]>([]);
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");

  const [content, setContent] = useState<string>("");

  // 무한 스크롤 state
  const [page, setPage] = useState<number>(1); // 페이지 번호
  const [hasMore, setHasMore] = useState<boolean>(true); // 추가 댓글 여부 확인

  // 댓글 생성
  const handlecommentClick = async (e: React.MouseEvent) => {
    try {
      await postComment({
        content,
        cardId,
        columnId,
        dashboardId,
      });
      setContent("");
      setPage(1);
      setCommentValues([]);
      fetchComents(1);
      setIsDisabled(true);
    } catch (err) {
      console.error("댓글 생성에 실패했습니다.");
    }
  };

  const fetchComents = async (page: number) => {
    try {
      const response = await getComment(cardId,page);
      // const response = await getComment(cardId,page);
      if (response.comments.length === 0) {
        setHasMore(false); // 댓글이 없는 경우 state 값 설정
      } else {
        setCommentValues((prevComments) => [
          ...prevComments,
          ...response.comments,
        ]);
      }
    } catch (error) {
      console.log("댓글을 가져올 수 없습니다.", error);
      alert("댓글을 가져올 수 없습니다.");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        !hasMore
      ) {
        return;
      }
      setPage((prevpage) => prevpage + 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  useEffect(() => {
    fetchComents(page);
  }, [page]);

  /**
  // 댓글 조회 - O
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await getComment(9824);
        setCommentValues(response.comments);
      } catch (err) {
        console.log("댓글을 가져올 수 없습니다:", err);
      }
    };
    fetchComment();
  }, []);
  */

  //   댓글 수정 버튼 누르기
  const handleEditClick = async (commentId: number, currentContent: string) => {
    setEditCommentId(commentId);
    setEditedContent(currentContent);
  };

  // 댓글 삭제
  const handleDeleteClick = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      setCommentValues((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (err) {
      console.error("댓글 삭제에 실패했습니다.");
    }
  };

  useEffect(()=>{
    handleDeleteClick
  },[commentValues]);

  // 댓글 수정
  const handleEditChange = async (commentId: number, content: string) => {
    try {
      const response = await putComment(commentId, content);

      // 응답에서 updatedAt 값을 추출
      const updatedAt = response.updatedAt;
      // 상태 업데이트
      setCommentValues((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content, updatedAt }
            : comment
        )
      );
      setEditCommentId(null);
      setEditedContent("");
    } catch (err) {
      console.error("댓글 수정에 실패했습니다.");
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setContent(newValue);
    setIsDisabled(newValue.trim() === ""); // 값이 없으면 비활성화, 있으면 활성화
  };

  const handleEditedCommentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    setEditedContent(newValue);
    console.log(editedContent);
  };

  const handleCancelEdit = () => {
    setEditCommentId(null);
    setEditedContent("");
  };
  

  return (
    <div className={styles["todo-comment-input-container"]}>
      <div className={styles["todo-comment-span-container"]}>
        <span className={styles["todo-comment-span"]}>댓글</span>
        <div className={styles["todo-comment-input-text"]}>
          <textarea
            placeholder="댓글 작성하기"
            className={styles["todo-comment-text"]}
            value={content}
            onChange={handleCommentChange}
          />
          <div className={styles["todo-comment-button-container"]}>
            <button
              className={`${styles["todo-comment-button"]} ${
                isDisabled ? styles.isDisabled : ""
              }`}
              onClick={handlecommentClick}
            >
              입력
            </button>
          </div>
        </div>
      </div>

      <section className={styles["todo-comment-container"]}>
        {commentValues.map((comment) => (
          <div
            key={comment.id}
            className={styles["todo-user-comment-container"]}
          >
            <img
              src={
                comment.author.profileImageUrl ||
                generateProfileImageUrl(comment.author.nickname)
              }
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
                  <span className={styles["todo-user-comment-auth-container"]}>
                    {formatDate(comment.updatedAt)}
                  </span>
                </div>

                {/* 수정할 때 / 만약 수정하지 않으면 content 보여주기 */}
                {editCommentId === comment.id ? (
                  <div className={styles["edited-comment-container"]}>
                    <textarea
                      value={editedContent}
                      className={`${styles["todo-comment-text"]} ${styles["edited-comment"]}`}
                      onChange={handleEditedCommentChange}
                    />
                    <div className={styles["edit-container"]}>
                      <button className={styles["todo-user-button"]} onClick={handleCancelEdit}>
                        취소
                      </button>
                      {/* 수정하기 */}
                      <button
                        className={styles["todo-user-button"]}
                        onClick={() =>
                          handleEditChange(comment.id, editedContent)
                        }
                      >
                        입력
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className={styles["todo-user-comment-auth"]}>
                    {comment.content}
                  </p>
                )}
              </div>

              {/* 수정 삭제 버튼을 같지 않을 때만 = 즉 수정하지 않을 때만 */}
              {editCommentId !== comment.id && (
                <div className={styles["edit-container"]}>
                  <button
                    className={styles["todo-user-button"]}
                    onClick={() => handleEditClick(comment.id, comment.content)}
                  >
                    수정
                  </button>
                  <button
                    className={styles["todo-user-button"]}
                    onClick={() => handleDeleteClick(comment.id)}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

