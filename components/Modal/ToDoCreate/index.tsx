import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "../ToDoCreate.module.scss";
import FileInput from "@/components/FileImage";
import Arrow_drop from "@/public/icons/arrow_drop.svg";
import CalendarIcon from "@/public/icons/calendar_today_icon.svg";
import Check_icon from "@/public/icons/check_icon.svg";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import Input from "@/components/Input/ModalInput";
import { getMember, postCards } from "@/lib/modalApi";
import { generateProfileImageUrl } from "@/lib/avatarsApi";
import { format } from "date-fns";

interface Assignee {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl?: string;
  userId: number;
}

interface DatePickerProps {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
}

interface Props {
  dashboardId: number;
  columnId: number;
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

// dashboardId columnId 가져오기

export default function ToDoCreate({ dashboardId, columnId }: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isTag, setIsTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagColors, setTagColors] = useState<{
    [key: string]: { backgroundColor: string; color: string };
  }>({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [assignees, setAssignees] = useState<Assignee[]>([]); //담당자 목록 조회
  const [selectedAssignee, setSelectedAssignee] = useState<Assignee>(); // 선택된 담당자
  const [initiallySelected, setInitiallySelected] = useState(false); // 드롭다운 열면 선택되는 담당자
  const [imgUrl, setImgUrl] = useState<string>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [values, setValues] = useState({
    assigneeUserId: selectedAssignee?.userId,
    dashboardId: 11370,
    columnId: 38425,
    title: "",
    description: "",
    dueDate: "",
    tags: tags,
    imageUrl: imgUrl,
  });

  useEffect(() => {
    if (startDate) {
      setValues((prevValues) => ({
        ...prevValues,
        dueDate: format(startDate, "yyyy-MM-dd HH:mm"),
      }));
    }
  }, [startDate]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleTagInput = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTag(e.target.value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = isTag.trim();
      if (newTag && !tags.includes(newTag)) {
        const { background, color } = getRandomColor();
        setTags([...tags, newTag]);
        setTagColors({
          ...tagColors,
          [newTag]: { backgroundColor: background, color: color },
        });
        setValues({
          ...values,
          tags: [...tags, newTag],
        });
        setIsTag("");
      }
    }
  };
  console.log(tagColors);

  const getRandomColor = () => {
    const colors = [
      { background: "#f9eee3", color: "#d58d49" },
      { background: "#e7f7db", color: "#89d549" },
      { background: "#f7dbf0", color: "#d549b6" },
      { background: "#dbe6f7", color: "#4981d5" },
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  // 이미지 -> string으로 바꾼 거
  const handleImageUpload = (url: string) => {
    setImgUrl(url);
    setValues({
      ...values,
      imageUrl: url,
    });
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await postCards(
        values.assigneeUserId,
        values.dashboardId,
        values.columnId,
        values.title,
        values.description,
        values.dueDate,
        values.tags,
        values.imageUrl || ""
      );
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };
  useEffect(() => {
    const { assigneeUserId, title, description } = values;
    if (assigneeUserId && title && description) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [values]);

  // 드롭다운의 첫 번째 배열 선택 - 이거 할까말까
  useEffect(() => {
    if (isOpen && assignees.length > 0 && !initiallySelected) {
      setSelectedAssignee(assignees[0]);
      setInitiallySelected(true);
    }
  }, [isOpen, assignees, initiallySelected]);

  // 담당자 목록 조회
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

  // 담당자 선택
  const handleAssigneeSelect = (assignee: Assignee) => {
    setSelectedAssignee(assignee);
    setValues({ ...values, assigneeUserId: assignee.userId });
    setIsOpen(false);
  };

  // assigneeUserId 조회

  // 드롭다운 외부 선택했을 때
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  console.log(startDate);
  console.log(values.dueDate);

  console.log(values.tags);

  return (
    <div className={styles["todo-create"]}>
      <h1 className={styles["todo-create-h1"]}>할일 생성</h1>
      <div className={styles["todo-create-input-section"]}>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-label"]}>담당자 *</label>

          <div className={styles["todo-create-assignee"]} ref={dropdownRef}>
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
              className={styles["arrow-drop-icon"]}
              onClick={toggleDropdown}
              width="26"
              height="26"
            />
            {isOpen && (
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
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-auth-label"]}>제목 *</label>
          <Input
            value={values.title}
            name="title"
            placeholder="제목을 입력해 주세요"
            onChange={handleInputChange}
            type="text"
          />
        </div>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-auth-label"]}>설명 *</label>
          <Input
            value={values.description}
            placeholder="설명을 입력해 주세요"
            type="text"
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
          <div className={styles["tag-list"]}>
            {tags.map((tag, index) => (
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
          <FileInput onImageUpload={handleImageUpload} />
        </div>
      </div>

      <div className={styles["todo-create-button-container"]}>
        <ModalButton className={styles["todo-create-button"]} isCancled={true}>
          취소
        </ModalButton>
        <ModalButton
          className={styles["todo-create-button"]}
          onClick={handleSubmit}
          isDisabled={isDisabled}
        >
          생성
        </ModalButton>
      </div>
    </div>
  );
}
