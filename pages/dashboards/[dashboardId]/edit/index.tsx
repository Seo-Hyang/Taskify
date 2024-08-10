import styles from "./index.module.scss";
import ReturnButton from "@/components/Button/ReturnButton/ReturnButton";
import ModalButton from "@/components/Button/ModalButton/ModalButton";
import EditDashboardInfo from "@/components/EditDashboard/EditDashboardInfo";
import EditMembers from "@/components/EditDashboard/EditMembers";
import EditInvitations from "@/components/EditDashboard/EditInvitations";
import useAsync from "@/hooks/useAsync";
import { useRouter } from "next/router";
import Head from "next/head";

import SelectModal from "@/components/Modal/SelectModal";
import SideMenu from "@/components/SideMenu/SideMenu";
import Header from "@/components/Header/Header";
import { deleteDashboard } from "@/services/dashboards";
import { useState } from "react";

export default function Edit() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isdeleteDashboard, deleteDashboardError, deleteDashboardAsync] =
    useAsync(deleteDashboard);
  const router = useRouter();
  const { dashboardId } = router.query;

  const handleDeleteDashboard = async (dashboardId: number) => {
    try {
      const { invitations, totalCount } = await deleteDashboardAsync(
        dashboardId
      );
    } catch (error) {
      console.error("대시보드 삭제 API 에러 발생: ", error);
    }
  };

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  const clickDelete = () => {
    handleDeleteDashboard(Number(dashboardId));
    router.push("/");
  };

  return (
    <>
      <div>
        <Head>
          <title>Taskify-대시보드 수정</title>
        </Head>
      </div>
      <section>
        <SideMenu />
        <Header>내 대시보드</Header>
      </section>
      <div className={styles.dashboardEditPage}>
        <div className={styles.header}>
          <ReturnButton link="/dashboards">돌아가기</ReturnButton>
        </div>
        <EditDashboardInfo id={Number(dashboardId)} />
        <EditMembers dashboardId={Number(dashboardId)} sizePerPage={5} />
        <EditInvitations dashboardId={Number(dashboardId)} sizePerPage={5} />
        <div className={styles.footer}>
          <ModalButton
            onClick={openModal}
            isCancled={true}
            className={styles.btnDelete}
          >
            대시보드 삭제하기
          </ModalButton>
        </div>
      </div>

      <SelectModal
        message="정말로 해당 대시보드를 삭제하시겠습니까?"
        isShow={isShowModal}
        btn1Text="취소"
        btn2Text="삭제"
        btn1OnClcik={closeModal}
        btn2OnClick={clickDelete}
      />
    </>
  );
}
