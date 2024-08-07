import styles from "./index.module.scss";
import PageButton from "@/components/Button/PageButton/PageButton";
import ColorCircle from "@/components/EditDashboard/ColorCircle";
import Button from "@/components/Button/Button/Button";
import { DashboardColor, colorList } from "@/types/dashboard-color";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import ModalButton from "@/components/Button/ModalButton/ModalButton";
import { TwitterPicker } from "react-color";
import { useRouter } from "next/router";
import { postDashboardAdd } from "@/lib/columnApi";
import Input from "@/components/Input/ModalInput";

interface Props {
  id: number;
  name: string;
}

export default function EditDashBoardInfo({ id, name }: Props) {
  // const [color, setColor] = useState<DashboardColor>("green");
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(true);
  const [values, setValues] = useState({
    title: "",
    color: "#000",
  });

  // title 없으면 버튼 비활성화
  useEffect(() => {
    setIsDisabled(!values.title);
  }, [values.title]);

  // title input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // color input
  const handleColorChangeComplete = (color: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      color: color.hex,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      // await postDashboardAdd(values.title, values.color);
      // router.push("/DashBoard/{dashboardid}");
      console.log("value.title: " + values.title);
      console.log("value.color: " + values.color);
    } catch (err) {
      console.error("대시보드 생성에 실패했습니다.");
    }
  };

  return (
    <>
      <div className={styles.editDashboardInfo}>
        <h1>{name}</h1>
        <div className={styles.infoDetail}>
          <p>대시보드 이름</p>
          <Input
            name="title"
            value={values.title}
            placeholder="변경할 대시보드 이름을 입력해 주세요"
            className={styles.inputTitle}
            type="text"
            onChange={handleInputChange}
          />
          {/* <div className={styles.colors}>
            {colorList.map((element) => {
              return (
                <ColorCircle
                  key={element}
                  color={element}
                  checked={element === color}
                  setColor={setColor}
                />
              );
            })}
          </div> */}
          <TwitterPicker
            color={values.color}
            onChangeComplete={handleColorChangeComplete}
            className={styles.dashboardColorPicker}
          />
        </div>
        <ModalButton
          onClick={handleSubmit}
          isComment={true}
          className={styles.btnSubmit}
        >
          변경
        </ModalButton>
      </div>
    </>
  );
}
