import ArrowButton from "@/components/Button/ArrowButton/ArrowButton";
import styles from "./index.module.scss";
import Button from "@/components/Button/Button/Button";
import PageButton from "@/components/Button/PageButton/PageButton";
import MiniPagenation from "@/components/MiniPagenation";
import { generateProfileImageUrl } from "@/utils/userProfile";
// import UserIcon from "@/components/UserIcon/UserIcon";

interface Props {
  email: string;
  name: string;
  imageUrl: string | null;
}

export default function MemberItem({ email, name, imageUrl }: Props) {
  return (
    <>
      <div className={styles.memberItem}>
        <div className={styles.name}>
          {/* <UserIcon userEmail={email} /> */}
          <img
            src={imageUrl ?? generateProfileImageUrl(email)}
            alt="프로필"
            width="38"
            height="38"
            className={styles["header-user-img"]}
          />
          <p>{name}</p>
        </div>
        <PageButton isCancled={true} isEditDashboard={true}>
          삭제
        </PageButton>
      </div>
    </>
  );
}
