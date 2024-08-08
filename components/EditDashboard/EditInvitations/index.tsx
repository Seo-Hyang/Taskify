import styles from "./index.module.scss";
import PageButton from "@/components/Button/PageButton/PageButton";
import MiniPagenation from "@/components/MiniPagenation";
import mockData from "./mock.json";
import InvitationItem from "./InvitationItem";
import useWindowSize from "@/hooks/useDevice";
import { MOBILE_MAX_WIDTH } from "@/constants/screensize";
import { useEffect, useState } from "react";
import useAsync from "@/hooks/useAsync";
import { getDashboardInvitations } from "@/services/dashboards";
import { DashboardInvitation } from "@/types/dashboard";
import ColumnInvite from "@/components/Column/ColumnInvite";
import Skeleton from "@/components/Skeleton";

// const { invitations } = mockData;
// const dashboardInvitations = invitations.filter((element) => {
//   return element.dashboard.id === 0;
// });

interface Props {
  dashboardId: number;
  sizePerPage: number;
}

export default function EditInvitations({ dashboardId, sizePerPage }: Props) {
  const { width } = useWindowSize();

  const [invitationList, setInvitationList] = useState<DashboardInvitation[]>();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(-1);
  const [invitationCount, setInvitationCount] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoadInvitations, loadInvitationsError, loadInvitations] = useAsync(
    getDashboardInvitations
  );

  const handleloadInvitations = async (
    dashboardId: number,
    page: number,
    size: number
  ) => {
    try {
      const { invitations, totalCount } = await loadInvitations(
        dashboardId,
        page,
        size
      );
      setTotalPage(Math.ceil(totalCount / sizePerPage));
      setInvitationList(invitations);
    } catch (error) {
      console.error("초대 목록 조회 API 에러 발생: ", error);
    }
  };

  useEffect(() => {
    if (!dashboardId) return;
    handleloadInvitations(dashboardId, page, sizePerPage);
  }, [page, invitationCount]);

  const handleClickLeft = () => {
    if (page <= 1) {
      return;
    }
    setPage(page - 1);
  };

  const handleClickRight = () => {
    if (page >= totalPage) {
      return;
    }
    setPage(page + 1);
  };

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
    // if (!isValid) {
    //   router.push("/");
    // }
  };

  const btnInvitation = (
    <PageButton isInvitation={true} onClick={openModal}>
      초대하기
    </PageButton>
  );

  if (isLoadInvitations) {
    return <Skeleton mainHeight={121} textHeight={65} textCount={5} />;
  }

  return (
    <>
      <div className={styles.editInvitations}>
        <div className={styles.headerWrapper}>
          <div className={styles.header}>
            <h1>초대 내역</h1>
            <div className={styles.headerRight}>
              <MiniPagenation
                currentPage={page}
                totalPage={totalPage}
                onClcikLeft={handleClickLeft}
                onClickRight={handleClickRight}
              />
              {width > MOBILE_MAX_WIDTH && btnInvitation}
            </div>
          </div>
          <div className={styles.subHeader}>
            <h2>이메일</h2>
            {width <= MOBILE_MAX_WIDTH && btnInvitation}
          </div>
        </div>
        <div className={styles.invitationList}>
          {invitationList?.map((invitation) => {
            return (
              <InvitationItem
                key={invitation.id}
                dashboardId={dashboardId}
                invitationId={invitation.id}
                email={invitation.invitee.email}
                setInvitationDeleteCount={setInvitationCount}
              />
            );
          })}
        </div>
      </div>
      <ColumnInvite
        dashboardId={dashboardId}
        isAttached={true}
        isShow={isShowModal}
        onClickCancle={closeModal}
        setInvitationCount={setInvitationCount}
      />
    </>
  );
}
