import styles from "@/components/Header/style.module.scss";
import HeaderButton from "@/components/Button/HeaderButton/HeaderButton";
import UserIcon from "@/components/UserIcon/UserIcon";
import CROWNSVG from "@/public/icons/crown_icon.svg";
import { TABLET_MAX_WIDTH, MOBILE_MAX_WIDTH } from "@/constants/screensize";
import useWindowSize from "@/hooks/useDevice";

export default function Header({
  children,
  userNickname = "",
  members = [],
  isOwner = "false",
}) {
  const { width } = useWindowSize();
  return (
    <header className={styles.Header}>
      <section className={styles.header_container}>
        <div>
          {width >= TABLET_MAX_WIDTH ? (
            <div className={styles.header_title}>
              {children}
              {isOwner ? <CROWNSVG className={styles.crown_icon} /> : <></>}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.header_buttons}>
          <HeaderButton setting={true}>관리</HeaderButton>
          <HeaderButton isInvitation={true}>초대하기</HeaderButton>
        </div>
      </section>
      <section className={styles.header_usersContainer}>
        <UserIcon userEmail="test@email.com" />
        <div className={styles.header_userNickname}>{userNickname}</div>
      </section>
    </header>
  );
}
