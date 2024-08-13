import styles from "@/components/Button/PageButton/style.module.scss";
import AddBox from "@/public/icons/add_box_icon.svg";
import { MouseEvent } from "react";

/**
 * 버튼 상태(종류)
 *페이지별 버튼
 삭제, 취소   84*32/52*28
 저장, 변경   84*32/84*28
 초대하기     105*32/86*28
 대시보드 삭제하기
 */

export default function PageButton({
  children = "",
  isCancled = false,
  isInvitation = false,
  isEditDashboard = false,
  isAccept = false,
  isDecline = false,
  onClick = () => {},
}) {
  return (
    <button
      className={`${styles.Button} ${isCancled ? styles.cancled : ""} ${
        isInvitation ? styles.invitation : ""
      } ${isEditDashboard ? styles.editDashboard : ""} ${
        isAccept ? styles.accepted : ""
      } ${isDecline ? styles.declined : ""}`}
      onClick={onClick}
    >
      <AddBox
        className={`${styles.noneSvg} ${isInvitation ? styles.addboxSvg : ""}`}
      />
      {children}
    </button>
  );
}
