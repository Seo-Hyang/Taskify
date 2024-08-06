import styles from "../ToDoCreate.module.scss";
import ModalButton from "@/components/Button/ModalButton/ModalButton";
import Arrow_drop from "@/public/icons/arrow_drop.svg";
import Check_icon from "@/public/icons/check_icon.svg";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import Input from "@/components/Input/Input";
import FileInput from "@/components/FileImage";
import { useRouter } from "next/router";

export default function ToDoEdit() {
  const router=useRouter();
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isColuumnSelected, setIsColuumnSelected] = useState();
  const [isAssignSelected, setIsAssignSelected] = useState();
  const [columnId,setColumnId]=useState<number>();
  const [assigneeUserId,setAssigneerUserId]=useState();
  const [title,setTitle]=useState<string>("");
  const [description,setDescription]=useState<string>("");
  const [date,setDate]=useState<string>("");
  const [tags,setTags]=useState<string[]>([]);
  const [imgUrl,setImgUrl]=useState<string>("");
  const [values, setValues] = useState({
    assigneeUserId: "",
    dashboardId: "",
    columnId: "",
    title: "",
    description: "",
    dueDate: "",
    tags: tags,
    imageUrl: "",
  });

  const toggleColumnDropdown = () => {
    setIsColumnOpen(!isColumnOpen);
  };

  const toggleAssignDropdown = () => {
    setIsAssignOpen(isAssignOpen);
  };

  // get통해 input 값 가져오기
  // useEffect(()=>{
  //   const fetchEditData=async ()=>{
  //     try{
  //       const response=await axios.get(`/cards/${cardId}`);
  //       // cardId는 어디서..?
  //       const {columnId,assigneeUserId,title,description,date,tags,imgUrl}=response.data;
  //       setColumnId(columnId);
  //       setAssigneerUserId(assigneeUserId);
  //       setTitle(title);
  //       setDescription(description);
  //       setDate(date);
  //       setTags(tags);
  //       setImgUrl(imgUrl);
  //     }catch(error){
  //       console.error(error);
  //     }
  //   };
  //   fetchEditData();
  // },[cardId]);

// async function handleSubmit(e:any){
//   e.preventDefault();
//   const {
//     assigneeUserId,
//     dashboardId,
//     columnId,
//     title,
//     description,
//     dueDate,
//     tags,
//     imageUrl,
//   } = values;
//   await axios.put(`'cards/${cardId}`, {
//     assigneeUserId,
//     dashboardId,
//     columnId,
//     title,
//     description,
//     dueDate,
//     tags,
//     imageUrl,
//   });
//   router.push("/DashBoard");
// }

  return (
    <div className={styles["todo-create"]}>
      <h1 className={styles["todo-create-h1"]}>할일 수정</h1>
      <div className={styles["todo-create-input-section"]}>
        <div className={styles["todo-create-input-container"]}>
          <div className={styles["todo-create-input-auth"]}>
            <label className={styles["todo-create-label"]}>상태</label>
            <div
              className={`${styles["todo-create-input"]} ${styles["todo-create-input-div"]}`}
            >
              <input className={styles.input}></input>
              <Arrow_drop
                onClick={toggleColumnDropdown}
                width="26"
                height="26"
              />
              {/* 상태 - columnId */}
              {isColumnOpen && (
                <>
                  <div className={styles["toggle-menu-container"]}>
                    {/* 선택 됐을 때 check_icon 뜰 수 있게 초깃값은 첫 번째 값 */}
                    <Check_icon width="22" height="22" />
                    <div className={styles["toggle-column-item-container"]}>
                      <div
                        className={styles["toggle-column-item-circle"]}
                      ></div>
                      {/* <span className={styles["toggle-column-item"]}>상태넣기</span> */}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={styles["todo-create-input-auth"]}>
            <label className={styles["todo-create-label"]}>담당자</label>
            <div
              className={`${styles["todo-create-input"]} ${styles["todo-create-input-div"]}`}
            >
              <input></input>
              <Arrow_drop
                onClick={toggleAssignDropdown}
                width="26"
                height="26"
              />
              {/* 담당자 - assignee-id */}
              {isAssignOpen && (
                <>
                  <div className={styles["toggle-menu-container"]}>
                    <Check_icon width="22" height="22" />
                    <div className={styles["toggle-assign-item-container"]}>
                      {/* <div className={styles["toggle-assign-item-img"]}>프로필 이미지 넣기</div> */}
                      {/* 프로필 이미지 색상 랜덤 */}
                      {/* <span className={styles["toggle-assign-item"]}>상태넣기</span> */}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-auth-label"]}>제목 *</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-auth-label"]}>설명 *</label>
          <Input value={description} onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-auth-label"]}>마감일</label>
          <Input value={date} onChange={(e) => setDate(e.target.value)}/>
        </div>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-auth-label"]}>태그</label>
          <Input value={tags} onChange={(e) => setTags(e.target.value)}/>
        </div>
        <div className={styles["todo-create-input-img"]}>
          <label className={styles["todo-create-auth-label"]}>이미지</label>
          <FileInput name="image" onChange={(file)=>console.log(file)}
            initialImageUrl={imgUrl}
            columnId={columnId}
            />
        </div>
      </div>

      <div className={styles["todo-create-button-container"]}>
        <ModalButton isCancled={true}>취소</ModalButton>
        <ModalButton isComment={true}>생성</ModalButton>
      </div>
    </div>
  );
}
