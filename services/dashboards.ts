import axiosInstance from "@/lib/axios";

// 대시보드 상세 조회
export async function getDashboard(dashboardId: number) {
  const response = await axiosInstance.get(`/dashboards/${dashboardId}`);
  return response.data;
}

// 대시보드 수정
export async function putDashboard(
  dashboardId: number,
  title: string,
  color: string
) {
  const requestBody = {
    title: title,
    color: color,
  };
  const response = await axiosInstance.put(
    `/dashboards/${dashboardId}`,
    requestBody
  );
  return response.data;
}
