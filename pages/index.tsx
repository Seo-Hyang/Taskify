import Link from "next/link";
import LandingPage from "./LandingPage";

export default function Home() {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
  };

  return (
    <>
      <LandingPage />
      {/* <LandingPage /> - / 페이지 테스트
      <ul>
        <li>
          <Link href="/LandingPage">▷랜딩 페이지</Link>
        </li>
        <li>
          <Link href="/login">▷로그인</Link>
        </li>
        <li>
          <Link href="/signup">▷회원가입</Link>
        </li>
        <li>
          <Link href="/dashboards">▷대시보드</Link>
        </li>
        <li>
          <Link href="/MyPage">▷마이 페이지</Link>
        </li>
        <li>
          <Link href="/ButtonTest">▷버튼 테스트 페이지</Link>
        </li>
        <li>
          <Link href="/ModalTest">▷모달 테스트 페이지</Link>
        </li>
        <li>
          <Link href="/MTest">모달 컴포넌트 테스트</Link>
        </li>
        <li>
          <Link href="/dashboards/11370/edit">▷대시보드 수정 페이지</Link>
        </li>
        <li>
          <button onClick={handleLogout}>로그아웃</button>
        </li>
      </ul> */}
    </>
  );
}
