import instance from "@/lib/axios";

// 프로필 이미지 업로드 API
const uploadProfileImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await instance.post("/users/me/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.profileImageUrl; // 서버에서 반환한 이미지 URL
  } catch (error) {
    console.error("(POST)이미지 업로드 에러 발생", error);
    throw error;
  }
};

// 프로필 이미지, 닉네임 수정 API
const updateProfile = async (
  profileNickname: string,
  profileImageUrl: string
) => {
  console.log(profileNickname, profileImageUrl);
  try {
    const response = await instance.put("/users/me", {
      nickname: profileNickname,
      profileImageUrl,
    });
    return response.data;
  } catch (error) {
    console.error("PUT 에러 발생", error);
    throw error;
  }
};

// 비밀번호 변경 API
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

export { uploadProfileImage, updateProfile, changePassword };
