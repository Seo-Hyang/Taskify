import axiosInstance from "@/lib/axios";

// 대시보드 상세 조회
export async function getDashboard(dashboardId: number) {
  try{
    const response = await axiosInstance.get(`/dashboards/${dashboardId}`);
    return response.data;
  }catch(err){
    console.log("대시보드 조회에 실패했습니다.");
  }
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

// 대시보드 삭제
export async function deleteDashboard(dashboardId: number) {
  const response = await axiosInstance.delete(`/dashboards/${dashboardId}`);
  return response.data;
}

// 대시보드 멤버 목록 조회
export async function getDashboardMembers(
  dashboardId: number,
  page = 1,
  size = 10
) {
  const query = `page=${page}&size=${size}&dashboardId=${dashboardId}`;
  const response = await axiosInstance.get(`/members?${query}`);
  return response.data;
}

// 대시보드 멤버 삭제
export async function deleteDashboardMember(memberId: number) {
  const response = await axiosInstance.delete(`/members/${memberId}`);
  return response.data.message;
}

// 대시보드 초대 불러오기
export async function getDashboardInvitations(
  dashboardId: number,
  page = 1,
  size = 10
) {
  const query = `page=${page}&size=${size}`;
  const response = await axiosInstance.get(
    `/dashboards/${dashboardId}/invitations?${query}`
  );
  return response.data;
}

// 대시보드 초대 취소
export async function cancleDashboardInvitation(
  dashboardId: number,
  invitationId: number
) {
  const response = await axiosInstance.delete(
    `/dashboards/${dashboardId}/invitations/${invitationId}`
  );
  return response.data.message;
}
