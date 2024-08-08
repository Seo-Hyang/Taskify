import styles from "./index.module.scss";

interface Props {
  mainHeight: number;
  textHeight: number;
  textCount: number;
}

export default function Skeleton({ mainHeight, textHeight, textCount }: Props) {
  return (
    <div className={styles["skeleton-container"]}>
      <div
        className={`${styles["skeleton"]} ${styles["skeleton-rect"]}`}
        style={{ height: `${mainHeight}px` }}
      />
      {Array.from({ length: textCount }, (_, index) => {
        return (
          <div
            key={index}
            className={`${styles["skeleton"]} ${styles["skeleton-text"]}`}
            style={{ height: `${textHeight}px` }}
          />
        );
      })}
    </div>
  );
}
