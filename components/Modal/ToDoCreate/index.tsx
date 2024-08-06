import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "../ToDoCreate.module.scss";
import FileInput from "@/components/FileImage";
import Arrow_drop from "@/public/icons/arrow_drop.svg";
import CalendarIcon from "@/public/icons/calendar_today_icon.svg";
import { ChangeEvent, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import Input from "@/components/Input/Input";
import axios from "@/lib/axios";

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
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isTag, setIsTag] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [values, setValues] = useState({
    assigneeUserId: "",
    title: "",
    description: "",
    dueDate: "",
    tags: tags,
    imageUrl: "",
  });

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
      if (newTag && !tags.some((tag) => tag.text === newTag)) {
        const { background, color } = getRandomColor();
        const newTags = [
          ...tags,
          { text: newTag, backgroundColor: background, color: color },
        ];
        setTags(newTags);
        setValues({
          ...values,
          tags: newTags,
        });
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

  const handleFileChange = (file: File | null) => {
    setFile(file);
    setValues({
      ...values,
      imageUrl: file ? URL.createObjectURL(file) : "",
    });
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    const { assigneeUserId, title, description, dueDate, tags, imageUrl } =
      values;
    await axios.post("/cards", {
      assigneeUserId,
      title,
      description,
      dueDate,
      tags,
      imageUrl,
    });
    router.push("/DashBoard");
  }

  useEffect(() => {
    const { assigneeUserId, title, description, tags, imageUrl } = values;
    if (assigneeUserId && title && description && tags.length > 0 && imageUrl) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [values]);

  return (
    <div className={styles["todo-create"]}>
      <h1 className={styles["todo-create-h1"]}>할일 생성</h1>
      <div className={styles["todo-create-input-section"]}>
        <div className={styles["todo-create-input-auth"]}>
          <label className={styles["todo-create-label"]}>담당자</label>
          <div className={styles["todo-create-input"]}>
            <Input
              className={styles["todo-create-input-div"]}
              placeholder="이름을 입력해 주세요"
              type="text"
              name="assigneeUserId"
              value={values.assigneeUserId}
              onChange={handleInputChange}
            />
            <Arrow_drop
              className={styles["arrow-drop-icon"]}
              onClick={toggleDropdown}
              width="26"
              height="26"
            />
            {/* <div className={styles["toggle-item-container"]}>
              <div className={styles["toggle-assign-item-img"]}></div>
              <span className={styles["toggle-assign-item"]}></span>
            </div> - 선택한 후 보이는 것들 */}
          </div>
          {/* {isOpen && <div>assignee-id</div>} - 얘는 드롭다운 해서 보이는 목록들 */}
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
          <DatePicker />
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
          <FileInput name="imageUrl" onChange={handleFileChange} />
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
