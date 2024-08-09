import Link from "next/link";

export default function Home() {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
  };

  return (
    <>
      <ul>
        <li>
          <Link href="/LandingPage">▷랜딩 페이지</Link>
        </li>
        <li>
          <Link href="/LoginPage">▷로그인</Link>
        </li>
        <li>
          <Link href="/SignUpPage">▷회원가입</Link>
        </li>
        <li>
          <Link href="/dashboards">▷대시보드</Link>
        </li>
        <li>
          <Link href="/MyPage/MyPage">▷마이 페이지</Link>
        </li>
        <li>
          <Link href="/ButtonTest">▷버튼 테스트 페이지</Link>
        </li>
        <li>
          <Link href="/ModalTest">▷모달 테스트 페이지</Link>
        </li>
        <li>
          <Link href="/dashboards/11370/edit">▷대시보드 수정 페이지</Link>
        </li>
        <li>
          <button onClick={handleLogout}>로그아웃</button>
        </li>
      </ul>
    </>
  );
}
