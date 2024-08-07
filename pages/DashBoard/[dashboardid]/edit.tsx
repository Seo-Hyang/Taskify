import styles from "./edit.module.scss";
import ReturnButton from "@/components/Button/ReturnButton/ReturnButton";
import ModalButton from "@/components/Button/ModalButton/ModalButton";
import EditDashboardInfo from "@/components/EditDashboard/EditDashboardInfo";
import EditMembers from "@/components/EditDashboard/EditMembers";
import EditInvitations from "@/components/EditDashboard/EditInvitations";
import useAsync from "@/hooks/useAsync";
import { useRouter } from "next/router";
import { getDashboard } from "@/services/dashboards";
import { useCallback, useEffect, useState } from "react";
import { Dashboard } from "@/types/dashboard";

export default function Edit() {
  // const dashboardName = "비브리지";
  const [dashboard, setDashboard] = useState<Dashboard>();
  const router = useRouter();
  const { dashboardId } = router.query;

  const [isLoadingDashboard, loadDashboardError, loadDashboard] =
    useAsync(getDashboard);

  const getDashboardAsync = useCallback(
    async (dashboardId: number) => {
      const res = await loadDashboard(dashboardId);
      const nextDashboard = res;
      console.info("res : " + nextDashboard);
      setDashboard(nextDashboard);
    },
    [loadDashboard]
  );

  useEffect(() => {
    if (!dashboardId) return;
    console.log(" dashboardId: " + dashboardId);
    getDashboardAsync(Number(dashboardId));
  }, [dashboardId, getDashboardAsync]);

  return (
    <>
      <div className={styles.dashboardEditPage}>
        <div className={styles.header}>
          <ReturnButton link="/dashboardid">돌아가기</ReturnButton>
        </div>
        <EditDashboardInfo name={dashboard?.title || "no data"} />
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
