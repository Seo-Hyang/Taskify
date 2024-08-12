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
  //나의 대시보드
  const [dashboardList, setDashboardList] = useState<Dashboard[]>([]); //대시모드 목록
  const [dashboardTotalCount, setDashboardTotalCount] = useState<number>(0); //대시보드 전체 개수
  const [pageCount, setPageCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1); //페이지 이동에 따라 변경
  const [pageSize, setPageSize] = useState<number>(5);
  //초대받은 대시보드
  const [invitedList, setInvitedList] = useState<DashboardInvitation[]>([]); //초대받은 대시보드 목록
  const [invitedCount, setInvitedCount] = useState<number>(0);
  //검색
  const [searchValue, setSearchValue] = useState("");
  const [errors, setErrors] = useState<string>("");

  const { isShowModal, setIsShowModal } = useInviteStore();

  const { openModal } = useModalStore();

  async function getDashboardList() {
    if (page === 1) {
      setPageSize(5);
    } else {
      setPageSize(6);
    }
    const res = await instance.get(
      `/dashboards?navigationMethod=pagination&page=${page}&size=${pageSize}`
    );
    const nextDashboardList = res.data;
    const { dashboards, totalCount, cursorId } = nextDashboardList;

    const pageCnt = Math.trunc(totalCount / pageSize) + 1;

    setDashboardList(dashboards);
    setDashboardTotalCount(totalCount);
    setPageCount(pageCnt);
  }

  //이전 페이지로
  const handlePagePrevClick = (e: React.MouseEvent) => {
    if (page > 1) {
      if (page === 2) {
        setPageSize(5);
      }
      setPage((prev) => prev - 1);
    } else return;
  };

  //다음 페이지로
  const handlePageNextClick = (e: React.MouseEvent) => {
    if (page < pageCount) {
      if (page === 1) {
        setPageSize(6);
      }
      setPage((prev) => prev + 1);
    } else return;
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
  }, [page]);

  // 대시보드 생성 칼럼
  const handleAddDashboardClick = (e: React.MouseEvent) => {
    openModal("column");
  };

  const closeModal = () => {
    setIsShowModal(false);
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
          <Header dashboardId={11370} />
        </section>
      </section>
      <section className={styles.dashboardContainer}>
        <section className={styles.dashboard_inner}>
          <section className={styles.dashboard_myListContainer}>
            <section
              className={`${styles.dashboard_myList} ${
                dashboardTotalCount === 0
                  ? styles["dashboard_myList-empty"]
                  : ""
              }`}
            >
              {page === 1 ? (
                <AddButton onClick={handleAddDashboardClick}>
                  새로운 대시보드
                </AddButton>
              ) : (
                <></>
              )}
              {dashboardList.map((item) => (
                <DashboardListButton
                  key={item.id}
                  isOwn={item.createdByMe}
                  color={item.color}
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
                  <ArrowButton leftArrow={true} onClick={handlePagePrevClick} />
                  <ArrowButton
                    rightArrow={true}
                    onClick={handlePageNextClick}
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
                              <PageButton isAccept={true}>수락</PageButton>
                              <PageButton isDecline={true}>거절</PageButton>
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
                              <PageButton isAccept={true}>수락</PageButton>
                              <PageButton isDecline={true}>거절</PageButton>
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
                              <PageButton isAccept={true}>수락</PageButton>
                              <PageButton isDecline={true}>거절</PageButton>
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
                              <PageButton isAccept={true}>수락</PageButton>
                              <PageButton isDecline={true}>거절</PageButton>
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
