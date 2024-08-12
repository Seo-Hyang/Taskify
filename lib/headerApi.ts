import axios from "axios";
import instance from "./axios";

interface RequestOptions {
    method: string;
    headers: Record<string, string>;
    data?: string | object;
  }

const fetchRequest = async (url: string, options: RequestOptions) => {
    try {
      const response = await instance(url, options);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "요청에 실패했습니다.");
      } else {
        throw new Error("요청에 실패했습니다.");
      }
    }
  };

//   대시보드 멤버 조회
export function getHeader(dashboardId: number) {
    const url = `/members?page=1&size=20&dashboardId=${dashboardId}`;
    const options = {
      method: "GET",
      headers: {
        "Context-type": "application/json",
      },
    };
    return fetchRequest(url, options);
  }

  // 내 정보 조회
  export function getMyPage() {
    const url = `/users/me`;
    const options = {
      method: "GET",
      headers: {
        "Context-type": "application/json",
      },
    };
    return fetchRequest(url, options);
  }