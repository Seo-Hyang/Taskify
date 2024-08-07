import styles from "./index.module.scss";
import PageButton from "@/components/Button/PageButton/PageButton";
import ColorCircle from "@/components/EditDashboard/ColorCircle";
import Button from "@/components/Button/Button/Button";
import { DashboardColor, colorList } from "@/types/dashboard-color";

import { ChangeEvent, MouseEvent, useState } from "react";
import ModalButton from "@/components/Button/ModalButton/ModalButton";

interface Props {
  name: string;
}

export default function EditDashBoardInfo({ name }: Props) {
  const [color, setColor] = useState<DashboardColor>("green");

  return (
    <>
      <div className={styles.editDashboardInfo}>
        <h1>{name}</h1>
        <div className={styles.infoDetail}>
          <p>대시보드 이름</p>
          <input></input>
          <div className={styles.colors}>
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
          </div>
        </div>
        <Button h={"50px"}>변경</Button>
      </div>
    </>
  );
}
