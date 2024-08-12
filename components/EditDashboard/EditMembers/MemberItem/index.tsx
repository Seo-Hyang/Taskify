import styles from "./index.module.scss";
import PageButton from "@/components/Button/PageButton/PageButton";
import { generateProfileImageUrl } from "@/utils/userProfile";
import useAsync from "@/hooks/useAsync";
import { deleteDashboardMember } from "@/services/dashboards";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

interface Props {
  memberId: number;
  email: string;
  name: string;
  imageUrl: string | null;
  setMemberDeleteCount: Dispatch<SetStateAction<number>>;
}

export default function MemberItem({
  memberId,
  email,
  name,
  imageUrl,
  setMemberDeleteCount,
}: Props) {
  const [isCompleteDeleteMember, deleteMemberError, deleteMember] = useAsync(
    deleteDashboardMember
  );

  const handleDeleteMemeber = async () => {
    try {
      const responseMessage = await deleteMember(memberId);
      setMemberDeleteCount((prev) => prev + 1);
    } catch (error) {
      console.error("구성원 삭제 API 에러 발생: " + error);
    }
  };

  return (
    <>
      <div className={styles.memberItem}>
        <div className={styles.name}>
          {/* <UserIcon userEmail={email} /> */}
          <Image
            src={imageUrl ?? generateProfileImageUrl(name)}
            alt="프로필"
            width="38"
            height="38"
            className={styles["header-user-img"]}
          />
          <p>{name}</p>
        </div>
        <PageButton
          isCancled={true}
          isEditDashboard={true}
          onClick={handleDeleteMemeber}
        >
          삭제
        </PageButton>
      </div>
    </>
  );
}
