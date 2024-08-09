import styles from "./index.module.scss";
import PageButton from "@/components/Button/PageButton/PageButton";
import useAsync from "@/hooks/useAsync";
import { cancleDashboardInvitation } from "@/services/dashboards";
import { Dispatch, SetStateAction } from "react";

interface Props {
  dashboardId: number;
  invitationId: number;
  email: string;
  setInvitationDeleteCount: Dispatch<SetStateAction<number>>;
}

export default function InvitationItem({
  dashboardId,
  invitationId,
  email,
  setInvitationDeleteCount,
}: Props) {
  const [isCompleteCancleInvitation, cancleInvitationError, cancleInvitation] =
    useAsync(cancleDashboardInvitation);

  const handleCancleInvitation = async () => {
    try {
      const responseMessage = await cancleInvitation(dashboardId, invitationId);
      setInvitationDeleteCount((prev) => prev + 1);
    } catch (error) {
      console.error("초대 취소 API 에러 발생: " + error);
    }
  };
  return (
    <>
      <div className={styles.invitationItem}>
        <p>{email}</p>
        <PageButton
          isCancled={true}
          isEditDashboard={true}
          onClick={handleCancleInvitation}
        >
          취소
        </PageButton>
      </div>
    </>
  );
}
