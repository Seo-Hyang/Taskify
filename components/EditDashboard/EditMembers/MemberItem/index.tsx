import ArrowButton from "@/components/Button/ArrowButton/ArrowButton";
import styles from "./index.module.scss";
import Button from "@/components/Button/Button/Button";
import PageButton from "@/components/Button/PageButton/PageButton";
import MiniPagenation from "@/components/MiniPagenation";
import UserIcon from "@/components/UserIcon/UserIcon";

interface Props {
  email: string;
  name: string;
}

export default function MemberItem({ email, name }: Props) {
  return (
    <>
      <div className={styles.memberItem}>
        <div className={styles.name}>
          <UserIcon userEmail={email} />
          <p>{name}</p>
        </div>
        <PageButton isCancled={true} isEditDashboard={true}>
          삭제
        </PageButton>
      </div>
    </>
  );
}
