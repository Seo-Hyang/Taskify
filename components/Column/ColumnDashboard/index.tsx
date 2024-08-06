import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "./Dashboard.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { TwitterPicker } from "react-color";
import Input from "@/components/Input/Input";
import { useRouter } from "next/router";
import axios from "@/lib/axios";

interface colorProps {
  name: string;
}

export default function ColumnDashboard() {
  const router = useRouter();
  const [color, setColor] = useState("#000");
  const [isDisabled, setIsDisabled] = useState(true);
  const [values, setValues] = useState({
    title: "",
    color: color,
  });

  useEffect(() => {
    const { title } = values;
    setIsDisabled(!title);
  }, [values]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleColorChangeComplete = (color: any) => {
    setColor(color.hex);
    setValues((prevValues) => ({
      ...prevValues,
      color: color.hex,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { title, color } = values;
    await axios.post("/dashboards", {
      title,
      color,
    });
    router.push("/dashBoard/{dashboardid}");
    // 소문자
  };

  return (
    <div className={styles["column-dashboard"]}>
      <div className={styles["column-dashboard-container"]}>
        <h1 className={styles["column-dashboard-h1"]}>새로운 대시보드</h1>
        <div className={styles["column-dashboard-name-container"]}>
          <div className={styles["column-dashboard-input-container"]}>
            <label className={styles["column-dashboard-label"]}>
              대시보드 이름
            </label>
            <Input
              name="title"
              value={values.title}
              placeholder="이름을 입력해 주세요"
              className={styles["column-dashboard-input"]}
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <TwitterPicker
            color={color}
            onChangeComplete={handleColorChangeComplete}
            className={styles["column-dashboard-color-picker"]}
          />
        </div>
        <div className={styles["column-dashboard-button-container"]}>
          <ModalButton isCancled={true}>취소</ModalButton>
          <ModalButton onClick={handleSubmit} isDisabled={isDisabled}>
            생성
          </ModalButton>
        </div>
      </div>
    </div>
  );
}
