import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "./ToDoModal.module.scss";
import Close from "@/public/icons/close_icon.svg";
import useWindowSize from "@/hooks/useDevice";
import { MOBILE_MAX_WIDTH } from "@/constants/screensize";
import Dropdown from "@/components/Dropdown";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";

export default function ToDoModal({ isOpen, onClose }: modalprops) {
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
  const [columnState,setColumnState]=useState<string>("");
  const [columnId,setColumnId]=useState<string>("");
  const [tags,setTags]=useState<string[]>([]);
  const [description,setDescription]=useState<string>("");
  const [imgUrl,setImgUrl]=useState<string>("");
  const [assigneeName,setAssigneeName]=useState<string>("");
  const [assigneeProfile,setAssigneeProfile]=useState<string>("");
  const [date,setDate]=useState<string>("");
  const [comment,setComment]=useState<string>("");
  const [commentDate,setCommentDate]=useState<string>("");
  const [commentAuthorProfile,setCommentAuthorProfile]=useState<string>("");
  const [commentAuthorName,setCommentAuthorName]=useState<string>("");

  // if (!isOpen) return null;

  // 칼럼 제목
  useEffect(()=>{
    const fetchColumnData=async ()=>{
    try{
      const response=await axios.get(`/columns?dashboardId=${dashboardId}`);
      // id와 title
      setColumnState(response.data.title);
      setColumnId(response.data.id);
    }catch(error){
      console.error(error);
    }
  };
  fetchColumnData();
  },[]);

  // 태그랑 내용
  useEffect(()=>{
    if(!columnId) return;

    const fetchTagData=async ()=>{
    try{
      const response=await axios.get(`/cards?size=10&columnId=${columnId}`);
      setTags(response.data.tags);
      setDescription(response.data.description);
      setDate(response.data.dueDate);
      setImgUrl(response.data.imageUrl);
      setAssigneeName(response.data.assignee.nickname);
      setAssigneeProfile(response.data.assignee.profileImageUrl);
    }catch(error){
      console.error(error);
    }
  };
  fetchTagData();
  },[columnId]);

  // 댓글 입력 누를 때
  const handleOnClick= async ()=>{
    const commentData={
    }
    await axios.post('/comments',{
      content:"",
      cardId:"",
      columnId:"",
      dashboardId:"",
    });
  }

  // 댓글 가져오기
  useEffect(()=>{
    const fetchCommentData=async ()=>{
      try{
        const response=await axios.get('/comments');
        setComment(response.data.comments.content);
        setCommentDate(response.data.comment.createdAt);
        setCommentAuthorName(response.data.author.nickname);
        setCommentAuthorProfile(response.data.author.profileImageUrl);
      }catch(error){
        console.error(error);
      }
    };
    fetchCommentData();
  },[]);


  return (
    <div className={styles["todo-modal"]}>
      {width <= MOBILE_MAX_WIDTH ? (
        <>
          <div className={styles["todo-top-icon"]}>
            <Dropdown />
            <button className={styles["todo-button"]} onClick={onClose}>
              <Close width="32" height="32" alt="닫기" />
            </button>
          </div>
          <h1 className={styles["todo-h1"]}>새로운 일정 관리 Taskify</h1>
        </>
      ) : (
        <>
          <div className={styles["todo-top"]}>
            <h1 className={styles["todo-h1"]}>새로운 일정 관리 Taskify</h1>
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
            <div className={styles["todo-chip"]}>{columnState}</div>
            {/* chip 넣기 */}
            </div>
            <div className={styles["todo-chip-container-line"]}></div>
            <div className={styles["todo-chip-container-tag-container"]}>
              <div className={styles["todo-chip-container-tag"]}>{tags}</div>
              {/* tag 넣기 */}
            </div>
          </section>

          <section className={styles["todo-description"]}>{description}</section>

          <div>{imgUrl}</div>

          <div className={styles["todo-comment-input-container"]}>
            <span className={styles["todo-comment-span"]}>댓글</span>
            <textarea placeholder="댓글 작성하기" className={styles["todo-comment-text"]} />
           <button className={styles["todo-comment-button"]} onClick={handleOnClick}>입력</button>
          </div>

          <section className={styles["todo-comment-container"]}>
            <div>{commentAuthorProfile}</div>
            <div className={styles["todo-user-comment-container"]}>
              <div className={styles["todo-user-comment-container-name"]}>
                <span
                  className={`${styles["todo-user-comment-auth"]} ${styles.name}`}
                >
                  {commentAuthorName}
                </span>
                <span
                  className={`${styles["todo-user-comment-auth-container"]} ${styles.date}`}
                >
                  {commentDate}
                </span>
              </div>
              <span
                className={`${styles["todo-user-comment-auth"]} ${styles.description}`}
              >
                {comment}
              </span>
              <div className={styles["edit-container"]}>
                <button className={styles["todo-user-button"]}>
                  <span className={styles["todo-user-comment-auth-container"]}>
                    수정
                  </span>
                </button>
                <button className={styles["todo-user-button"]}>
                  <span className={styles["todo-user-comment-auth-container"]}>
                    삭제
                  </span>
                </button>
              </div>
            </div>
          </section>
        </div>

        <section className={styles["todo-user-container"]}>
          <div
            className={`${styles["todo-user-container-top"]} ${styles["todo-margin"]}`}
          >
            <h2 className={styles["todo-user-top"]}>담당자</h2>
            <div className={styles["todo-user-img-container"]}>
              <div className={styles["todo-user-img"]}>{assigneeProfile}</div>
              <span className={styles["todo-user-name"]}>{assigneeName}</span>
            </div>
          </div>
          <div className={styles["todo-user-container-top"]}>
            <h2 className={styles["todo-user-top"]}>마감일</h2>
            <div className={styles["todo-user-name"]}>{date}</div>
          </div>
        </section>
      </div>
    </div>
  );
}
