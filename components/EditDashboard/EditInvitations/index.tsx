import styles from "./index.module.scss";
import PageButton from "@/components/Button/PageButton/PageButton";
import MiniPagenation from "@/components/MiniPagenation";
import mockData from "./mock.json";
import InvitationItem from "./InvitationItem";
import useWindowSize from "@/hooks/useDevice";
import { MOBILE_MAX_WIDTH } from "@/constants/screensize";

const { invitations } = mockData;
const dashboardInvitations = invitations.filter((element) => {
  return element.dashboard.id === 0;
});

export default function EditInvitations() {
  const { width } = useWindowSize();
  const btnInvitation = <PageButton isInvitation={true}>초대하기</PageButton>;

  return (
    <>
      <div className={styles.editInvitations}>
        <div className={styles.headerWrapper}>
          <div className={styles.header}>
            <h1>초대 내역</h1>
            <div className={styles.headerRight}>
              <MiniPagenation currentPage={1} totalPage={1} />
              {width > MOBILE_MAX_WIDTH && btnInvitation}
            </div>
          </div>
          <div className={styles.subHeader}>
            <h2>이메일</h2>
            {width <= MOBILE_MAX_WIDTH && btnInvitation}
          </div>
        </div>
        <div className={styles.invitationList}>
          {dashboardInvitations.map((invitation) => {
            return (
              <InvitationItem
                key={invitation.id}
                email={invitation.invitee.email}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
