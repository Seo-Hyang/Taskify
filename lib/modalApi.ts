import axios from "axios";
import instance from "./axios";

interface RequestOptions {
  method: string;
  headers: Record<string, string>;
  data?: string;
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