import ArrowButton from "@/components/Button/ArrowButton/ArrowButton";
import styles from "./index.module.scss";
import { MouseEvent } from "react";

interface Props {
  currentPage: number;
  totalPage: number;
  onClcikLeft: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickRight: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function MiniPagenation({
  currentPage,
  totalPage,
  onClcikLeft,
  onClickRight,
}: Props) {
  return (
    <>
      <div className={styles.miniPagenation}>
        <p>{`${totalPage} 페이지 중 ${currentPage}`}</p>
        <div>
          <ArrowButton leftArrow onClick={onClcikLeft} />
          <ArrowButton rightArrow onClick={onClickRight} />
        </div>
      </div>
    </>
  );
}
