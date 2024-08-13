//기본 import
import Header from "@/components/Header/Header";
import SideMenu from "@/components/SideMenu/SideMenu";
import Head from "next/head";
import styles from "@/pages/dashboards/style.module.scss";
import { useEffect, useState } from "react";
import { Dashboard, DashboardInvitation } from "@/types/dashboard";
import instance from "@/lib/axios";
import useWindowSize from "@/hooks/useDevice";
import { MOBILE_MAX_WIDTH } from "@/constants/screensize";
import { useRouter } from "next/router";

//컴포넌트 import
import DashboardListButton from "@/components/Button/DashboardListButton/DashboardListButton";
import AddButton from "@/components/Button/AddButton/AddButton";
import PageButton from "@/components/Button/PageButton/PageButton";
import ArrowButton from "@/components/Button/ArrowButton/ArrowButton";
import EnvelopSVG from "@/public/icons/envelop.svg";
import SearchInputItem from "@/components/Input/SearchInput/SearchInput";
import ColumnDashboard from "@/components/Column/ColumnDashboard";
import useModalStore from "@/hooks/useModalStore";
import useInviteStore from "@/hooks/useInviteStore";
import ColumnInvite from "@/components/Column/ColumnInvite";

export default function DashBoards() {
  const { width } = useWindowSize();
  const router = useRouter();
  //나의 대시보드
  const [dashboardList, setDashboardList] = useState<Dashboard[]>([]); //대시모드 목록
  const [dashboardTotalCount, setDashboardTotalCount] = useState<number>(0); //대시보드 전체 개수
  const [pageCount, setPageCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1); //페이지 이동에 따라 변경
  const [pageSize, setPageSize] = useState<number>(6);
  const [prevPageState, setPrevPageState] = useState(true);
  const [nextPageState, setNextPageState] = useState(false);
  //초대받은 대시보드
  const [invitedList, setInvitedList] = useState<DashboardInvitation[]>([]); //초대받은 대시보드 목록
  const [invitedCount, setInvitedCount] = useState<number>(0);
  const [inviteAccepted, setInviteAccepted] = useState<boolean>(true);
  const [inviteDenied, setInviteDenied] = useState<boolean>(false);
  const [invitationId, setInvitationId] = useState<number>(0);
  //검색
  const [searchValue, setSearchValue] = useState("");

  const { isShowModal, setIsShowModal } = useInviteStore();

  const { openModal } = useModalStore();

  async function getDashboardList() {
    const res = await instance.get(
      `/dashboards?navigationMethod=pagination&page=${page}&size=${pageSize}`
    );
    const nextDashboardList = res.data;
    const { dashboards, totalCount, cursorId } = nextDashboardList;

    const pageCnt = Math.ceil(totalCount / 6);

    setDashboardList(dashboards);
    setDashboardTotalCount(totalCount);
    setPageCount(pageCnt);
  }

  //이전 페이지로
  const handlePagePrevClick = (e: React.MouseEvent) => {
    setPage((page) => page - 1);
    setNextPageState(false);
    if (page === 2) {
      setPrevPageState(true);
    }
  };

  //다음 페이지로
  const handlePageNextClick = (e: React.MouseEvent) => {
    setPage((page) => page + 1);
    setPrevPageState(false);

    if (page === pageCount - 1) {
      setNextPageState(true);
    }
  };

  async function getInvitedList() {
    const res = await instance.get(`/invitations?size=${pageSize}`);
    const nextDashboardList = res.data;
    const { invitations, cursorId } = nextDashboardList;
    const invitationCount = invitations.length;

    setInvitedList(invitations);
    setInvitedCount(invitationCount);
  }

  function handleChange(e: any) {
    setSearchValue(e.target.value);
  }

  //대시보드 목록, 페이지 수, 현재 페이지
  useEffect(() => {
    getDashboardList();
    getInvitedList();
    if (pageCount === 1) {
      setNextPageState(true);
    }
  }, [page, pageCount, invitedList]);

  // 대시보드 생성 칼럼
  const handleAddDashboardClick = (e: React.MouseEvent) => {
    openModal("column");
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  const acceptInvitation = async () => {
    try {
      const response = await instance.put(`/invitations/${invitationId}`, {
        inviteAccepted,
      });
      return response.data;
    } catch (error) {
      console.error("에러 발생", error);
      throw error;
    }
  };

  return (
    <div>
      <ColumnDashboard />
      {/* 대시보드 생성 칼럼 */}
      <section>
        <Head>
          <title>Taskify-대시보드</title>
        </Head>
        <section>
          <SideMenu />
          <Header
            dashboardId={
              localStorage.getItem("currentDashboardId") !== null
                ? Number(localStorage.getItem("currentDashboardId"))
                : 0
            }
          />
        </section>
      </section>
      <section className={styles.dashboardContainer}>
        <section className={styles.dashboard_inner}>
          <section className={styles.dashboard_myListContainer}>
            <AddButton onClick={handleAddDashboardClick}>
              새로운 대시보드
            </AddButton>
            <section
              className={`${styles.dashboard_myList} ${
                dashboardTotalCount === 0
                  ? styles["dashboard_myList-empty"]
                  : ""
              }`}
            >
              {dashboardList.map((item) => (
                <DashboardListButton
                  key={item.id}
                  isOwn={item.createdByMe}
                  color={item.color}
                  onClick={() => {
                    localStorage.setItem(
                      "currentDashboardId",
                      item.id.toString()
                    );
                    router.push(
                      `/dashboards/${localStorage.getItem(
                        "currentDashboardId"
                      )}`
                    );
                  }}
                >
                  {item.title}
                </DashboardListButton>
              ))}
            </section>
            {dashboardTotalCount === 0 ? (
              <></>
            ) : (
              <div className={styles.dashboard_pageCursor}>
                {pageCount} 페이지 중 {page}
                <div>
                  <ArrowButton
                    leftArrow={true}
                    onClick={handlePagePrevClick}
                    disabled={prevPageState}
                  />
                  <ArrowButton
                    rightArrow={true}
                    onClick={handlePageNextClick}
                    disabled={nextPageState}
                  />
                </div>
              </div>
            )}
          </section>
          <section className={styles.dashboard_invitedList}>
            <section className={styles.invited_inner}>
              <section className={styles.dashboard_invitedTitle}>
                초대받은 대시보드
              </section>
              {invitedCount === 0 ? (
                <section className={styles.invited_empty}>
                  <EnvelopSVG className={styles.invited_emptySVG} />
                  <p className={styles.invited_emptyText}>
                    아직 초대받은 대시보드가 없어요
                  </p>
                </section>
              ) : (
                <section>
                  <SearchInputItem
                    value={searchValue}
                    onChange={handleChange}
                    placeholder="검색"
                  />
                  {width > MOBILE_MAX_WIDTH ? (
                    <section className={styles.invited_list}>
                      <div className={styles.dashboard_invitedColumnTitle}>
                        <p className={styles.column_title}>이름</p>
                        <p className={styles.column_inviter}>초대자</p>
                        <p className={styles.column_button}>수락여부</p>
                      </div>
                      {invitedList.map((item) =>
                        searchValue.length === 0 ? (
                          <section
                            key={item.id}
                            className={styles.dashboard_invitedContainer}
                          >
                            <div className={styles.invited_title}>
                              {item.dashboard.title}
                            </div>
                            <div className={styles.invited_inviter}>
                              {item.inviter.nickname}
                            </div>
                            <div className={styles.dashboard_invitedButtons}>
                              <PageButton
                                isAccept={true}
                                onClick={() => {
                                  instance.put(`/invitations/${item.id}`, {
                                    inviteAccepted,
                                  });
                                }}
                              >
                                수락
                              </PageButton>
                              <PageButton
                                isDecline={true}
                                onClick={() => {
                                  instance.put(`/invitations/${item.id}`, {
                                    inviteDenied,
                                  });
                                }}
                              >
                                거절
                              </PageButton>
                            </div>
                          </section>
                        ) : item.dashboard.title.indexOf(searchValue) != -1 ||
                          item.inviter.nickname.indexOf(searchValue) != -1 ? (
                          <section
                            key={item.id}
                            className={styles.dashboard_invitedContainer}
                          >
                            <div className={styles.invited_title}>
                              {item.dashboard.title}
                            </div>
                            <div className={styles.invited_inviter}>
                              {item.inviter.nickname}
                            </div>
                            <div className={styles.dashboard_invitedButtons}>
                              <PageButton
                                isAccept={true}
                                onClick={() => {
                                  instance.put(`/invitations/${item.id}`, {
                                    inviteAccepted,
                                  });
                                }}
                              >
                                수락
                              </PageButton>
                              <PageButton
                                isDecline={true}
                                onClick={() => {
                                  instance.put(`/invitations/${item.id}`, {
                                    inviteDenied,
                                  });
                                }}
                              >
                                거절
                              </PageButton>
                            </div>
                          </section>
                        ) : (
                          <></>
                        )
                      )}
                    </section>
                  ) : (
                    <>
                      {invitedList.map((item) =>
                        searchValue.length === 0 ? (
                          <section
                            key={item.id}
                            className={styles.dashboard_invitedContainer}
                          >
                            <div className={styles["column_section-mobile"]}>
                              <p>이름</p>
                              <div className={styles["invited_item-mobile"]}>
                                {item.dashboard.title}
                              </div>
                            </div>
                            <div className={styles["column_section-mobile"]}>
                              <p>초대자</p>
                              <div className={styles["invited_item-mobile"]}>
                                {item.inviter.nickname}
                              </div>
                            </div>
                            <div
                              className={
                                styles["dashboard_invitedButtons-mobile"]
                              }
                            >
                              <PageButton
                                isAccept={true}
                                onClick={() => {
                                  instance.put(`/invitations/${item.id}`, {
                                    inviteAccepted,
                                  });
                                }}
                              >
                                수락
                              </PageButton>
                              <PageButton
                                isDecline={true}
                                onClick={() => {
                                  instance.put(`/invitations/${item.id}`, {
                                    inviteDenied,
                                  });
                                }}
                              >
                                거절
                              </PageButton>
                            </div>
                          </section>
                        ) : item.dashboard.title.indexOf(searchValue) != -1 ||
                          item.inviter.nickname.indexOf(searchValue) != -1 ? (
                          <section
                            key={item.id}
                            className={styles.dashboard_invitedContainer}
                          >
                            <div className={styles["column_section-mobile"]}>
                              <p>이름</p>
                              <div className={styles["invited_item-mobile"]}>
                                {item.dashboard.title}
                              </div>
                            </div>
                            <div className={styles["column_section-mobile"]}>
                              <p>초대자</p>
                              <div className={styles["invited_item-mobile"]}>
                                {item.inviter.nickname}
                              </div>
                            </div>
                            <div
                              className={
                                styles["dashboard_invitedButtons-mobile"]
                              }
                            >
                              <PageButton
                                isAccept={true}
                                onClick={() => {
                                  instance.put(`/invitations/${item.id}`, {
                                    inviteAccepted,
                                  });
                                }}
                              >
                                수락
                              </PageButton>
                              <PageButton
                                isDecline={true}
                                onClick={() => {
                                  instance.put(`/invitations/${item.id}`, {
                                    inviteDenied,
                                  });
                                }}
                              >
                                거절
                              </PageButton>
                            </div>
                          </section>
                        ) : (
                          <></>
                        )
                      )}
                    </>
                  )}
                </section>
              )}
            </section>
          </section>
        </section>
      </section>
    </div>
  );
}
