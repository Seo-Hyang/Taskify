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
import { useTagColors } from "@/hooks/useTagColors";
import Dialog from "../modal";
import useModalStore from "@/hooks/useModalStore";
import Image from "next/image";

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

interface ToDoCreateProps {
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

export default function ToDoCreate({ dashboardId, columnId }: ToDoCreateProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isTag, setIsTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [assignees, setAssignees] = useState<Assignee[]>([]);
  const [selectedAssignee, setSelectedAssignee] = useState<Assignee>();
  const [initiallySelected, setInitiallySelected] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const { tagColors, addTagColor } = useTagColors();
  const { closeModal } = useModalStore();

  const [values, setValues] = useState({
    assigneeUserId: selectedAssignee?.userId,
    dashboardId: 0,
    columnId: 0,
    title: "",
    description: "",
    dueDate: "",
    tags: tags,
    imageUrl: "",
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
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = isTag.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        addTagColor(newTag); // Use the hook function to set the tag color
        setValues({
          ...values,
          tags: [...tags, newTag],
        });
        setIsTag("");
      }
    }
  };

  const handleImageUpload = (url: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      imageUrl: url,
    }));
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
        dashboardId,
        columnId,
        values.title,
        values.description,
        values.dueDate,
        values.tags,
        values.imageUrl || ""
      );
      closeModal("createCard");
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };
  useEffect(() => {
    const { assigneeUserId, title, description, tags, dueDate, imageUrl } =
      values;
    if (assigneeUserId && title && description && tags && dueDate && imageUrl) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [values]);

  useEffect(() => {
    if (isOpen && assignees.length > 0 && !initiallySelected) {
      setSelectedAssignee(assignees[0]);
      setInitiallySelected(true);
    }
  }, [isOpen, assignees, initiallySelected]);

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

  const handleAssigneeSelect = (assignee: Assignee) => {
    setSelectedAssignee(assignee);
    setValues({ ...values, assigneeUserId: assignee.userId });
    setIsOpen(false);
    console.log(values.assigneeUserId);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleCancelClick = () => {
    closeModal("createCard");
  };

  return (
    <Dialog id="createCard" className={styles["dialog-container"]}>
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
            <label className={styles["todo-create-auth-label"]}>마감일 *</label>
            <DatePicker startDate={startDate} setStartDate={setStartDate} />
          </div>
          <div className={styles["todo-create-input-auth"]}>
            <label className={styles["todo-create-auth-label"]}>태그 *</label>
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
            <label className={styles["todo-create-auth-label"]}>
              이미지 (변경 불가능한 항목입니다)
            </label>
            <FileInput
              onImageUpload={handleImageUpload}
              initialImageUrl={values.imageUrl}
              columnId={columnId}
            />
          </div>
        </div>
        <div className={styles["todo-create-button-container"]}>
          <ModalButton
            className={styles["todo-create-button"]}
            isCancled={true}
            onClick={handleCancelClick}
          >
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
    </Dialog>
  );
}
