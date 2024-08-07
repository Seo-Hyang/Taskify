import axiosInstance from "@/lib/axios";

export async function getDashboard(dashboardId: number) {
  const response = await axiosInstance.get(`/dashboards/${dashboardId}`);
  return response.data;
}
