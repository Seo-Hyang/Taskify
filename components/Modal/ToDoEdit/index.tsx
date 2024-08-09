import styles from "../ToDoCreate.module.scss";
import ModalButton from "@/components/Button/ModalButton/ModalButton";
import Arrow_drop from "@/public/icons/arrow_drop.svg";
import Check_icon from "@/public/icons/check_icon.svg";
import { useEffect, useRef, useState } from "react";
import Input from "@/components/Input/ModalInput";
import FileInput from "@/components/FileImage";
import { useRouter } from "next/router";
import { getMember, putCard } from "@/lib/modalApi";
import { getColumnAdd } from "@/lib/columnApi";

// 담당자 기본 프로필
const generateProfileImageUrl = (email: string) => {
  const initials = email.charAt(0).toUpperCase();
  return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&rounded=true`;
};

interface Assignee {
  id: string;
  email: string;
  nickname: string;
  profileImageUrl?: string;
  userId: string;
}

interface Columns {
  id: string;
  title: string;
}

export default function ToDoEdit(cardId: string, dashboardId: string) {
  const router = useRouter();
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [columnId, setColumnId] = useState<number>();
  const [assigneeUserId, setAssigneerUserId] = useState();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [imgUrl, setImgUrl] = useState<string>("");
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

  const dropdownAssigneeRef = useRef<HTMLDivElement>(null);
  const dropdownColumnRef=useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<Columns[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<Columns | null>(null);
  const [assignees, setAssignees] = useState<Assignee[]>([]);
  const [selectedAssignee, setSelectedAssignee] = useState<Assignee | null>(
    null
  );

  const toggleColumnDropdown = () => {
    setIsColumnOpen(!isColumnOpen);
  };

  const toggleAssignDropdown = () => {
    setIsAssignOpen(!isAssignOpen);
  };

  const handleOutsideAssigneeClick = (e: MouseEvent) => {
    if (
      dropdownAssigneeRef.current &&
      !dropdownAssigneeRef.current.contains(e.target as Node)
    ) {
      setIsAssignOpen(false);
    }
  };

  const handleOutsideColumnClick = (e: MouseEvent) => {
    if (
      dropdownColumnRef.current &&
      !dropdownColumnRef.current.contains(e.target as Node)
    ) {
      setIsColumnOpen(false);
    }
  };


  // 카드 가져오기
  // useEffect(()=>{

  // })

  // 카드 수정 post
  const handleEitClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await putCard(cardId);
    } catch (err) {
      console.log("해당 카드 수정에 실패했습니다.");
    }
  };

  // 담당자 get
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await getMember(11374);
        setAssignees(response.members);
      } catch (err) {
        console.error("멤버를 조회할 수 없습니다.");
      }
    };
    fetchMembers();
  }, []);

  // 담당자 선택
  const handleAssigneeSelect = (assignee: Assignee) => {
    setSelectedAssignee(assignee);
    setValues({ ...values, assigneeUserId: assignee.userId });
    setIsAssignOpen(false);
  };

  // 칼럼 get
  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await getColumnAdd(11374);
        setColumns(response.data);
      } catch (err) {
        console.error("칼럼을 조회할 수 없습니다.");
      }
    };
    fetchColumns();
  }, []);

  // 칼럼 선택
  const handleColumnSelect = (column: Columns) => {
    setSelectedColumns(column);
    setValues({ ...values, columnId: column.id });
    setIsColumnOpen(false);
  };

    // 드롭다운 담당자 외부 선택했을 때
    useEffect(() => {
      document.addEventListener("mousedown", handleOutsideAssigneeClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideAssigneeClick);
      };
    }, []);

     // 드롭다운 칼럼 외부 선택했을 때
     useEffect(() => {
      document.addEventListener("mousedown", handleOutsideColumnClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideColumnClick);
      };
    }, []);

  return (
    <div className={styles["todo-create"]}>
      <h1 className={styles["todo-create-h1"]}>할일 수정</h1>
      <div className={styles["todo-create-input-section"]}>
        <div className={styles["todo-create-input-container"]}>
          <div className={styles["todo-create-input-auth"]} ref={dropdownColumnRef}>
            <label className={styles["todo-create-label"]}>상태</label>
            <div className={styles["todo-edit-dropdown"]}>
              {selectedColumns ? (
                <div className={styles["toggle-column-item-container"]}>
                  <div className={styles["toggle-column-item-circle"]}></div>
                  <span className={styles["toggle-column-item"]}>
                    {selectedColumns.title}
                  </span>
                </div>
              ) : (
                <span className={styles["placeholder"]}>
                  상태를 입력해 주세요
                </span>
                // 여기에다가 원래 값
              )}
              <Arrow_drop
                onClick={toggleColumnDropdown}
                width="26"
                height="26"
                className={styles["arrow-drop-icon"]}
              />
              {isColumnOpen && (
                <div className={styles["dropdown-menu"]}>
                  {columns.map((column) => (
                    <div
                      className={styles["toggle-assign-item-container"]}
                      key={column.id}
                      onClick={() => handleColumnSelect(column)}
                    >
                      <div className={styles["check-icon"]}>
                        {selectedColumns?.id === column.id && (
                          <Check_icon width="22" height="22" />
                        )}
                      </div>
                      <div className={styles["toggle-column-item-container"]}>
                        <div
                          className={styles["toggle-column-item-circle"]}
                        ></div>
                        <span className={styles["toggle-column-item"]}>
                          {column.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className={styles["todo-create-input-auth"]}>
            <label className={styles["todo-create-label"]}>담당자</label>
            <div className={styles["todo-edit-dropdown"]} ref={dropdownAssigneeRef}>
              {selectedAssignee ? (
                <div className={styles["toggle-assign-item-container"]}>
                  <img
                    src={
                      selectedAssignee.profileImageUrl
                        ? selectedAssignee.profileImageUrl
                        : generateProfileImageUrl(selectedAssignee.nickname)
                    }
                    alt="프로필"
                    className={styles["toggle-assign-item-img"]}
                  />
                  <span className={styles["toggle-assign-item"]}>
                    {selectedAssignee.nickname}
                  </span>
                </div>
              ) : (
                <span className={styles["placeholder"]}>
                  이름을 입력해 주세요
                </span>
              )}
              <Arrow_drop
                onClick={toggleAssignDropdown}
                width="26"
                height="26"
                className={styles["arrow-drop-icon"]}
              />
              {isAssignOpen && (
                <div className={styles["dropdown-menu"]}>
                  {assignees.map((assignee) => (
                    <div
                      className={styles["toggle-assign-item-container"]}
                      key={assignee.userId}
                      onClick={() => handleAssigneeSelect(assignee)}
                    >
                      <div className={styles["check-icon"]}>
                        {selectedAssignee?.id === assignee.id && (
                          <Check_icon width="22" height="22" />
                        )}
                      </div>
                      <img
                        src={
                          assignee.profileImageUrl
                            ? assignee.profileImageUrl
                            : generateProfileImageUrl(assignee.nickname)
                        }
                        alt="프로필"
                        className={styles["toggle-assign-item-img"]}
                      />
                      <span className={styles["toggle-assign-item"]}>
                        {assignee.nickname}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-auth-label"]}>제목 *</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-auth-label"]}>설명 *</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-auth-label"]}>마감일</label>
          <Input value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-auth-label"]}>태그</label>
          {/* <Input value={tags} onChange={(e) => setTags(e.target.value)} /> */}
        </div>
        <div className={styles["todo-create-input-img"]}>
          <label className={styles["todo-create-auth-label"]}>이미지</label>
          {/* <FileInput
            onChange={(file) => console.log(file)}
            initialImageUrl={imgUrl}
            columnId={columnId}
          /> */}
        </div>
      </div>

      <div className={styles["todo-create-button-container"]}>
        <ModalButton isCancled={true}>취소</ModalButton>
        <ModalButton isComment={true}>생성</ModalButton>
      </div>
    </div>
  );
}
