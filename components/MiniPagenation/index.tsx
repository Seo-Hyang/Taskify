import ArrowButton from "@/components/Button/ArrowButton/ArrowButton";
import styles from "./index.module.scss";
import Button from "@/components/Button/Button/Button";
import PageButton from "@/components/Button/PageButton/PageButton";

interface Props {
  currentPage: number;
  totalPage: number;
}

export default function MiniPagenation({ currentPage, totalPage }: Props) {
  return (
    <>
      <div className={styles.miniPagenation}>
        <p>{`${totalPage} 페이지 중 ${currentPage}`}</p>
        <div>
          <ArrowButton leftArrow />
          <ArrowButton rightArrow />
        </div>
      </div>
    </>
  );
}
