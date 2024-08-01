import styles from "@/components/Button/ModalButton/style.module.scss";

/**
 * 버튼 상태(종류)
 *모달 버튼
 취소 생성 - 120*48/120*48/138*42
 취소 초대
 취소 수정
 */

export default function ModalButton({
  children,
  isCancled = false,
  isComment = false,
}) {
  return (
    <button
      className={`${styles.Button} ${isCancled && styles.cancled} ${
        isComment && styles.comment
      }`}
    >
      {children}
    </button>
  );
}
