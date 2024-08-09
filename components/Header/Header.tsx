import styles from "@/components/Header/style.module.scss";
import HeaderButton from "@/components/Button/HeaderButton/HeaderButton";
import CROWNSVG from "@/public/icons/crown_icon.svg";
import { TABLET_MAX_WIDTH, MOBILE_MAX_WIDTH } from "@/constants/screensize";
import useWindowSize from "@/hooks/useDevice";
import { useRouter } from "next/router";
import { useDashboard } from "@/contexts/DashboardContext";
import { useEffect, useState } from "react";
import { getHeader, getMyPage } from "@/lib/headerApi";
import Image from "next/image";

// 기본 프로필
const generateProfileImageUrl = (email: string) => {
  const initials = email.charAt(0).toUpperCase();
  return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&rounded=true`;
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

interface Assignee {
  userId: string;
  email: string;
  nickname: string;
  profileImageUrl: string;
  isOwner: boolean;
}

interface My {
  email: string;
  nickname: string;
  profileImageUrl: string | null;
}

export default function Header({
  children,
  dashboardId,
}: {
  children?: React.ReactNode;
  dashboardId: number;
}) {
  const randomBackgroundColor = getRandomColor();
  const { width } = useWindowSize();
  const router = useRouter();
  const { dashboard } = useDashboard();
  const [isOwner, setIsOwner] = useState<Assignee | null>(null);
  const [nonOwners, setNonOwners] = useState<Assignee[]>([]);
  const [values, setValues] = useState<My>({
    email: "",
    nickname: "",
    profileImageUrl: null,
  });

  const clickSetting = () => {
    router.push(`/dashboard/${dashboard?.id}/edit`);
  };

  // 초대 받은 사람 조회
  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await getHeader(dashboardId);
        const owners = response.members.filter(
          (member: Assignee) => member.isOwner
        );
        const nonOwners = response.members.filter(
          (member: Assignee) => !member.isOwner
        );
        setNonOwners(nonOwners.reverse());
      } catch (err) {
        console.error("멤버 조회에 실패했습니다.");
      }
    };
    fetchMember();
  }, []);

  const displayedMembers = nonOwners.slice(0, 3); // 보여지는 멤버 (3명만) - 수정 가능
  const remaininCount = nonOwners.length - 3; //숨기는 멤버

  // 내 정보 조회
  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const response = await getMyPage();
        values.nickname = response.nickname;
        values.email = response.email;
        values.profileImageUrl = response.profileImageUrl;
      } catch (err) {
        console.error("내 정보 조회에 실패했습니다.");
      }
    };
    fetchMyData();
  }, []);

  return (
    <header className={styles.Header}>
      <section className={styles.header_container}>
        <div>
          {width >= TABLET_MAX_WIDTH ? (
            <div className={styles.header_title}>
              {dashboard?.title ?? children}
              {/* 여긴 내가 만든 대시보드가 안 들어가도 되는건가... */}
              {isOwner ? <CROWNSVG className={styles.crown_icon} /> : <></>}
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className={styles["header-button-member-container"]}>
          <div className={styles.header_buttons}>
            <HeaderButton setting={true} onClick={clickSetting}>
              관리
            </HeaderButton>
            <HeaderButton isInvitation={true}>초대하기</HeaderButton>
          </div>
          <div className={styles["dashboard-members-container"]}>
            {displayedMembers.map((member, index) => (
              <Image
                key={member.userId}
                src={
                  member.profileImageUrl
                    ? member.profileImageUrl
                    : generateProfileImageUrl(member.email)
                }
                alt={member.nickname}
                className={styles["dashboard-members"]}
                style={{
                  zIndex: nonOwners.length + index,
                  marginLeft: index > 0 ? "-8px" : "0",
                }}
                width={38}
                height={38}
              />
            ))}
            {remaininCount > 0 && (
              <div
                className={styles["header-remain-incount"]}
                style={{
                  zIndex: nonOwners.length + displayedMembers.length,
                  marginLeft: "-10px",
                  background: randomBackgroundColor,
                }}
              >
                +{remaininCount}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.header_usersContainer}>
        <Image
          src={
            values.profileImageUrl
              ? values.profileImageUrl
              : generateProfileImageUrl(values.email)
          }
          alt="프로필"
          width={38}
          height={38}
          className={styles["header-user-img"]}
        />
        <div className={styles.header_userNickname}>{values.nickname}</div>
      </section>
    </header>
  );
}
