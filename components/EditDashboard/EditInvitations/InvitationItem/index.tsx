import ArrowButton from "@/components/Button/ArrowButton/ArrowButton";
import styles from "./index.module.scss";
import Button from "@/components/Button/Button/Button";
import PageButton from "@/components/Button/PageButton/PageButton";
import MiniPagenation from "@/components/MiniPagenation";
import UserIcon from "@/components/UserIcon/UserIcon";

interface Props {
  email: string;
}

export default function InvitationItem({ email }: Props) {
  return (
    <>
      <div className={styles.invitationItem}>
        <p>{email}</p>
        <PageButton isCancled={true} isEditDashboard={true}>
          취소
        </PageButton>
      </div>
    </>
  );
}
