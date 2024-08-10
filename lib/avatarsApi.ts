// 담당자 기본 프로필
// 파스텔 톤 색상을 생성하는 함수
function getRandomPastelColor() {
  const randomValue = () => Math.floor(Math.random() * 56 + 200); // 200 ~ 255 사이의 값
  const red = randomValue();
  const green = randomValue();
  const blue = randomValue();
  return `${red.toString(16).padStart(2, "0")}${green
    .toString(16)
    .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;
}

// 로컬 스토리지에서 색상 가져오기, 생성, 저장 함수
function getCreateProfileColor(email: string) {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const colorKey = `profileColor-$(email)`;
    let color = localStorage.getItem(colorKey);

    if (!color) {
      color = getRandomPastelColor();
      localStorage.setItem(colorKey, color);
    }

    return color;
  } else {
    return getRandomPastelColor();
  }
}

// 프로필 이미지 URL을 생성하는 함수
export function generateProfileImageUrl(email: string) {
  const initials = email.charAt(0).toUpperCase();
  const backgroundColor = getCreateProfileColor(email);
  return `https://ui-avatars.com/api/?name=${initials}&background=${backgroundColor}&color=000&rounded=true`;
}
