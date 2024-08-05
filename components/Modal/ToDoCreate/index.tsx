import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "../ToDoCreate.module.scss";
import FileInput from "@/components/FileInput";
import Arrow_drop from "@/public/icons/arrow_drop.svg";
import CalendarIcon from "@/public/icons/calendar_today_icon.svg";
import { ChangeEvent, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Tag {
  text: string;
  backgroundColor: string;
  color: string;
}

const DatePicker: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div className={styles["calendar-container"]}>
      <CalendarIcon width="22" height="22" />
      <ReactDatePicker
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        dateFormat="yyyy.MM.dd HH:mm"
        showTimeSelect
        timeIntervals={30}
        className={styles["calendar-container-input"]}
      />
    </div>
  );
};

export default function ToDoCreate() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTag, setIsTag] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleTagInput = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTag(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = isTag.trim();
      if (newTag && !tags.some((tag) => tag.text === newTag)) {
        const { background, color } = getRandomColor();
        setTags([
          ...tags,
          { text: newTag, backgroundColor: background, color: color },
        ]);
        setIsTag("");
      }
    }
  };

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

  return (
    <div className={styles["todo-create"]}>
      <h1 className={styles["todo-create-h1"]}>할일 생성</h1>
      <div className={styles["todo-create-input-section"]}>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-label"]}>담당자</label>
          <div
            className={`${styles["todo-create-input"]} ${styles["todo-create-input-div"]}`}
          >
            <input></input>
            <div className={styles["toggle-item-container"]}>
              <div className={styles["toggle-assin-item-img"]}></div>
              <span className={styles["toggle-assing-item"]}></span>
            </div>
            <Arrow_drop onClick={toggleDropdown} width="26" height="26" />
          </div>
          {isOpen && <div>assignee-id</div>}
        </div>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-auth-label"]}>제목 *</label>
          <input></input>
        </div>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-auth-label"]}>설명 *</label>
          <input></input>
        </div>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-auth-label"]}>마감일</label>
          <DatePicker />
        </div>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-auth-label"]}>태그</label>
          <input
            name="tag"
            value={isTag}
            onChange={handleTagInput}
            onKeyDown={handleKeyDown}
          ></input>
          <div className={styles["tag-list"]}>
            {tags.map((tag, index) => (
              <span
                key={index}
                className={styles.tag}
                style={{
                  backgroundColor: tag.backgroundColor,
                  color: tag.color,
                }}
              >
                {tag.text}
              </span>
            ))}
          </div>
        </div>
        <div className={styles["todo-create-input-img"]}>
          <label className={styles["todo-create-auth-label"]}>이미지</label>
          <FileInput />
        </div>
      </div>

      <div className={styles["todo-create-button-container"]}>
        <ModalButton className={styles["todo-create-button"]} isCancled={true}>
          취소
        </ModalButton>
        <ModalButton className={styles["todo-create-button"]} isComment={true}>
          생성
        </ModalButton>
      </div>
    </div>
  );
}
