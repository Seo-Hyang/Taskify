import axios from "axios";
import instance from "@/lib/axios";

// 비밀번호 변경 AHI
const changePassword = async (password: string, newPassword: string) => {
  try {
    const response = await instance.put("/auth/password", {
      password,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("비밀번호 변경 에러 발생", error);
    throw error;
  }
};

// 내 정보 수정 API 호출
const updateProfile = async (nickname: string, profileImageUrl: string) => {
  try {
    const response = await axios.put("/users/me", {
      nickname,
      profileImageUrl,
    });
    return response.data;
  } catch (error) {
    console.error("프로필 업데이트 에러 발생", error);
    throw error;
  }
};

export { changePassword, updateProfile };
