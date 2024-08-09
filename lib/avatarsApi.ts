// 담당자 기본 프로필
export function generateProfileImageUrl(email: string) {
  const initials = email.charAt(0).toUpperCase();
  return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&rounded=true`;
}
