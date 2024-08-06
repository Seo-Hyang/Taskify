import styles from "@/components/Button/ModalButton/style.module.scss";

/**
 * 버튼 상태(종류)
 *모달 버튼
 취소 생성 - 120*48/120*48/138*42
 취소 초대
 취소 수정
 */

interface ModalButtonProps {
  children: React.ReactNode;
  isCancled?: boolean;
  isComment?: boolean;
  isDisabled?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ModalButton({
  children,
  isCancled = false,
  isComment = false,
  isDisabled = false,
  className = "",
  onClick,
}: ModalButtonProps) {
  return (
    <button
      className={`${styles.Button} ${isCancled && styles.cancled} ${
        isComment && styles.comment
      } ${isDisabled ? styles.disabled : ""} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
