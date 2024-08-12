// 담당자 기본 프로필
// 파스텔 톤 색상을 생성하는 함수
const pastelColors = [
  { background: "#F9EEE3", text: "#D58D49" },
  { background: "#E7F7DB", text: "#6B9C2F" },
  { background: "#F7DBF0", text: "#D549B6" },
  { background: "#DBE6F7", text: "#4981D5" },
  { background: "#FCE6E8", text: "#D43F56" },
  { background: "#E3F2FD", text: "#1E88E5" },
  { background: "#F2E2F0", text: "#D870A1" },
  { background: "#E2F3E7", text: "#3D9970" },
  { background: "#F5F3E5", text: "#D8A77F" },
  { background: "#E6F1F5", text: "#00A3E0" },
  { background: "#F9F0F5", text: "#B63F6C" },
  { background: "#E9F5E1", text: "#7D9A5F" },
  { background: "#F6F9E9", text: "#82BE96" },
  { background: "#F2F0F0", text: "#B8B8B8" },
  { background: "#F1F6F4", text: "#8B9A5B" },
  { background: "#F0E5F4", text: "#B53F76" },
];

function getPastelColorFromEmail(email: string) {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % pastelColors.length;
  return pastelColors[index];
}

function getCreateProfileColor(email: string) {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const colorKey = `profileColor-${email}`;
    let color = localStorage.getItem(colorKey);

    if (!color) {
      const { background } = getPastelColorFromEmail(email);
      localStorage.setItem(colorKey, background);
      color = background;
    }

    return color;
  } else {
    return getPastelColorFromEmail(email).background;
  }
}

export function generateProfileImageUrl(email: string) {
  const initials = email.charAt(0).toUpperCase();
  const { background, text } = getPastelColorFromEmail(email);
  return `https://ui-avatars.com/api/?name=${initials}&background=${background.slice(
    1
  )}&color=${text.slice(1)}&rounded=true`;
}
