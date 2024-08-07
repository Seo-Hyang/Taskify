import styles from "./edit.module.scss";
import Header from "@/components/Header/Header";
import SideMenu from "@/components/SideMenu/SideMenu";
import DashboardColumn from "@/components/DashboardColumns/DashboardColumns";
import AddButton from "@/components/Button/AddButton/AddButton";
import Head from "next/head";
import Link from "next/link";
import Button from "@/components/Button/Button/Button";
import PageButton from "@/components/Button/PageButton/PageButton";
import ArrowFoward from "@/public/icons/arrow_forwad.svg";
import ReturnButton from "@/components/Button/ReturnButton/ReturnButton";
import ModalButton from "@/components/Button/ModalButton/ModalButton";
import EditDashboardInfo from "@/components/EditDashboard/EditDashboardInfo";
import EditMembers from "@/components/EditDashboard/EditMembers";
import EditInvitations from "@/components/EditDashboard/EditInvitations";

export default function Edit() {
  const dashboardName = "비브리지";
  return (
    <>
      <div className={styles.dashboardEditPage}>
        <div className={styles.header}>
          <ReturnButton link="/dashboardid">돌아가기</ReturnButton>
        </div>
        <EditDashboardInfo name={dashboardName} />
        <EditMembers />
        <EditInvitations />
        <div className={styles.footer}>
          <ModalButton isCancled={true} className={styles.btnDelete}>
            대시보드 삭제하기
          </ModalButton>
        </div>
      </div>
    </>
  );
}
