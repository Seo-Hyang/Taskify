import styles from "../ToDoCreate.module.scss";
import ModalButton from "@/components/Button/ModalButton/ModalButton";
import Arrow_drop from "@/public/icons/arrow_drop.svg";
import Check_icon from "@/public/icons/check_icon.svg";
import { ChangeEvent, useEffect, useRef, useState } from "react";
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

interface Assignee {
  userId:number;
  id?:number;
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

export default function ToDoEdit(cardId: string, dashboardId: string) {
  const router = useRouter();
  const { tagColors, addTagColor } = useTagColors();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isTag, setIsTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);
  const dropdownAssigneeRef = useRef<HTMLDivElement>(null);
  const dropdownColumnRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<Columns[]>([]); //드롭다운 했을 때 컬럼 상태들
  const [selectedColumns, setSelectedColumns] = useState<Columns | null>(null); // 선택된 컬럼 상태
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
        const response = await getCardId(9829);
        console.log(response);
        setTags(response.tags);
        response.tags.forEach((tag) => addTagColor(tag));
        SetValues({
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
        });
        setStartDate(new Date(response.dueDate));
        setImgUrl(response.imageUrl);
        console.log(imgUrl);
      } catch (err) {
        console.error("카드 조회에 실패했습니다");
      }
    };
    fetchCardData();
  }, [cardId]);
  console.log(values.assignee.userId);

  // 카드 수정
  // (cardId(props), columnId(props),assignessUserId(selectedAssignee.userId랑 같음), title,description,dueDate,tags,imageUrl 필요)
  const handleEditClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await putCard(
        9829,
        values.assignee.userId,
        38425,
        values.title,
        values.description,
        values.dueDate,
        values.tags,
        values.imageUrl
      );
    } catch (err) {
      console.error("카드 수정에 실패했습니다.");
    }
  };
  // 담당자 get
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await getMember(11370);
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
        const response = await getColumnAdd(11370);
        setColumns(response.data);
      } catch (err) {
        console.error("칼럼을 조회할 수 없습니다.");
      }
    };
    fetchColumns();
  }, []);

  // 드롭다운 -> 칼럼 선택
  const handleColumnSelect = (column: Columns) => {
    setSelectedColumns(column);
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
    setImgUrl(url);
  };
  return (
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
              {selectedColumns ? (
                <div className={styles["toggle-column-item-container"]}>
                  <div className={styles["toggle-column-item-circle"]}></div>
                  <span className={styles["toggle-column-item"]}>
                    {selectedColumns.title}
                  </span>
                </div>
              ) : (
                <span className={styles["placeholder"]}>
                  {/* columnId의 title */}
                </span>
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
        <div className={styles["todo-create-input-img"]}>
          <label className={styles["todo-create-auth-label"]}>이미지</label>
          <FileInput
            onImageUpload={handleNewImageUpload}
            initialImageUrl={imgUrl}
          />
        </div>
      </div>

      <div className={styles["todo-create-button-container"]}>
        <ModalButton isCancled={true}>취소</ModalButton>
        <ModalButton
          isComment={true}
          isDisabled={isDisabled}
          onClick={handleEditClick}
        >
          수정
        </ModalButton>
      </div>
    </div>
  );
}
