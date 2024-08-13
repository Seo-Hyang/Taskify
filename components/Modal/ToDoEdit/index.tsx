import styles from "../ToDoCreate.module.scss";
import ModalButton from "@/components/Button/ModalButton/ModalButton";
import Arrow_drop from "@/public/icons/arrow_drop.svg";
import Check_icon from "@/public/icons/check_icon.svg";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import Input from "@/components/Input/ModalInput";
import FileInput from "@/components/FileImage";
import { useRouter } from "next/router";
import { getCardId, getMember, putCard } from "@/lib/modalApi";
import { getColumnAdd } from "@/lib/columnApi";
import { generateProfileImageUrl } from "@/lib/avatarsApi";
import ReactDatePicker from "react-datepicker";
import CalendarIcon from "@/public/icons/calendar_today_icon.svg";
import { format } from "date-fns";
import { useTagColors } from "@/hooks/useTagColors";
import Dialog from "../modal";
import useModalStore from "@/hooks/useModalStore";
import { useCardStore } from "@/hooks/useCarStore";
import useEditModalStore from "@/hooks/useEditModalStore";

interface Assignee {
  userId?: number;
  id?: number;
  nickname: string;
  profileImageUrl?: string;
}

interface Columns {
  id: string;
  title: string;
}

interface DatePickerProps {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
}

interface PutProps {
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
  assignee: Assignee;
  columnId?: number;
}

interface ToDoEditProps {
  cardId: number;
  columnId: number;
  dashboardId: number;
  onUpdate?: (updatedCard: CardData) => void;
}

interface CardData {
  id: number;
  title: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ startDate, setStartDate }) => {
  return (
    <div className={styles["calendar-container"]}>
      <CalendarIcon width="22" height="22" />
      <ReactDatePicker
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        dateFormat="yyyy-MM-dd HH:mm"
        showTimeSelect
        timeIntervals={30}
        className={styles["calendar-container-input"]}
      />
    </div>
  );
};

export default function ToDoEdit({
  cardId,
  columnId,
  dashboardId,
  onUpdate,
}: ToDoEditProps) {
  const router = useRouter();
  const { setCard } = useCardStore();
  const { tagColors, addTagColor } = useTagColors();
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isTag, setIsTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const dropdownAssigneeRef = useRef<HTMLDivElement>(null);
  const dropdownColumnRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<Columns[]>([]); //드롭다운 했을 때 컬럼 상태들
  const [selectedColumn, setSelectedColumn] = useState<Columns | null>(null); // 선택된 컬럼 상태
  const [assignees, setAssignees] = useState<Assignee[]>([]); // 드롭다운 했을 때 담당자들
  const [selectedAssignee, setSelectedAssignee] = useState<
    Assignee | undefined
  >(); // 선택된 담당자
  const [values, SetValues] = useState<PutProps>({
    title: "",
    description: "",
    dueDate: "",
    tags: [],
    imageUrl: "",
    assignee: {
      userId: 0,
      nickname: "",
      profileImageUrl: "",
    },
  });
  const { editcloseModal } = useEditModalStore();

  const toggleColumnDropdown = () => setIsColumnOpen(!isColumnOpen);
  const toggleAssignDropdown = () => setIsAssignOpen(!isAssignOpen);

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

  const handleTagInput = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTag(e.target.value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    SetValues({
      ...values,
      [name]: value,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = isTag.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        addTagColor(newTag); // Use the hook function to set the tag color
        SetValues({
          ...values,
          tags: [...tags, newTag],
        });
        setIsTag("");
      }
    }
  };

  useEffect(() => {
    if (startDate) {
      SetValues((prevValues) => ({
        ...prevValues,
        dueDate: format(startDate, "yyyy-MM-dd HH:mm"),
      }));
    }
  }, [startDate]);

  // 카드 가져오기 (assigneeid, assigneenickname,assigneeprofileImageUrl(얜 props로), 담당자, 제목, 설명, 마감일, 태그 ,이미지)
  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await getCardId(cardId);
        setTags(response.tags);
        response.tags.forEach((tag) => addTagColor(tag));
        SetValues((prevValues) => ({
          ...prevValues,
          title: response.title,
          description: response.description,
          dueDate: response.dueDate,
          tags: response.tags,
          imageUrl: response.imageUrl,
          assignee: {
            userId: response.assignee.id,
            nickname: response.assignee.nickname,
            profileImageUrl: response.assignee.profileImageUrl || undefined,
          },
        }));
        setStartDate(new Date(response.dueDate));
      } catch (err) {
        console.error("카드 조회에 실패했습니다");
      }
    };
    fetchCardData();
  }, [cardId]);

  // 카드 수정
  // (cardId(props), columnId(props),assignessUserId(selectedAssignee.userId랑 같음), title,description,dueDate,tags,imageUrl 필요)
  const handleEditClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const columnId = selectedColumn ? Number(selectedColumn.id) : 0;
      values.tags.forEach((tag) => addTagColor(tag));
      const updatedCard = {
        id: values.assignee.userId || 0,
        title: values.title,
        description: values.description,
        dueDate: values.dueDate,
        tags: values.tags,
        imageUrl: values.imageUrl,
        assignee: {
          userId: values.assignee.id,
          nickname: values.assignee.nickname,
          profileImageUrl: values.assignee.profileImageUrl || undefined,
        },
      };
      await putCard(
        cardId,
        values.assignee.userId ?? 0,
        columnId,
        values.title,
        values.description,
        values.dueDate,
        values.tags,
        values.imageUrl
      );
      setCard(updatedCard);
      if (onUpdate) {
        onUpdate(updatedCard);
      }
    } catch (err) {
      console.error("카드 수정에 실패했습니다.");
    }
    editcloseModal("editcard");
  };

  // 담당자 get
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await getMember(dashboardId);
        setAssignees(response.members);
      } catch (err) {
        console.error("멤버를 조회할 수 없습니다.");
      }
    };
    fetchMembers();
  }, []);

  // 드롭다운 -> 담당자 선택
  const handleAssigneeSelect = (assignee: Assignee) => {
    setSelectedAssignee(assignee);
    setIsAssignOpen(false);
  };

  // 칼럼 get
  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await getColumnAdd(dashboardId);
        setColumns(response.data);
        const matchedColumn = response.data.find(
          (column: CardData) => column.id === columnId
        );
        if (matchedColumn) {
          setSelectedColumn(matchedColumn);
        } else {
          console.log("No matching column found.");
        }
      } catch (err) {
        console.error("Failed to fetch columns.");
      }
    };
    fetchColumns();
  }, [dashboardId, columnId]);

  // 드롭다운 -> 칼럼 선택
  const handleColumnSelect = (column: Columns) => {
    setSelectedColumn(column);
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

  const handleNewImageUpload = (url: string) => {
    SetValues((prevValues) => ({
      ...prevValues,
      imageUrl: url,
    }));
  };
  const handleCancelClick = () => {
    editcloseModal("editcard");
  };

  return (
    <Dialog id="editcard" className={styles["dialog-container"]}>
      <div className={styles["todo-create"]}>
        <h1 className={styles["todo-create-h1"]}>할일 수정</h1>
        <div className={styles["todo-create-input-section"]}>
          <div className={styles["todo-create-input-container"]}>
            <div
              className={styles["todo-create-input-auth"]}
              ref={dropdownColumnRef}
            >
              <label className={styles["todo-create-label"]}>상태</label>
              <div className={styles["todo-edit-dropdown"]}>
                {selectedColumn && (
                  <div className={styles["toggle-column-item-container"]}>
                    <div className={styles["toggle-column-item-circle"]}></div>
                    <span className={styles["toggle-column-item"]}>
                      {selectedColumn.title}
                    </span>
                  </div>
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
                          {selectedColumn?.id === column.id && (
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
              <div
                className={styles["todo-edit-dropdown"]}
                ref={dropdownAssigneeRef}
              >
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
                  <div className={styles["toggle-assign-item-container"]}>
                    <img
                      src={
                        values.assignee.profileImageUrl
                          ? values.assignee.profileImageUrl
                          : generateProfileImageUrl(values.assignee.nickname)
                      }
                      className={styles["toggle-assign-item-img"]}
                      alt="기존 담당자"
                    />
                    <span className={styles["toggle-assign-item"]}>
                      {values.assignee.nickname}
                    </span>
                  </div>
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
                          {selectedAssignee?.userId === assignee.userId && (
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
            <Input
              value={values.title}
              name="title"
              onChange={handleInputChange}
              className={styles["todo-input"]}
            />
          </div>
          <div className={styles["todo-create-input-auth"]}>
            <label className={styles["todo-create-auth-label"]}>설명 *</label>
            <Input
              value={values.description}
              name="description"
              onChange={handleInputChange}
            />
          </div>
          <div className={styles["todo-create-input-auth"]}>
            <label className={styles["todo-create-auth-label"]}>마감일</label>
            <DatePicker startDate={startDate} setStartDate={setStartDate} />
          </div>
          <div className={styles["todo-create-input-auth"]}>
            <label className={styles["todo-create-auth-label"]}>태그</label>
            <Input
              name="tag"
              value={isTag}
              onChange={handleTagInput}
              onKeyDown={handleKeyDown}
              className={styles["todo-input"]}
              placeholder="입력 후 Enter"
            />
            <div className={styles["prev-tag"]}>
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
        </div>

        <div className={styles["todo-create-button-container"]}>
          <ModalButton isCancled={true} onClick={handleCancelClick}>
            취소
          </ModalButton>
          <ModalButton isComment={true} onClick={handleEditClick}>
            수정
          </ModalButton>
        </div>
      </div>
    </Dialog>
  );
}
