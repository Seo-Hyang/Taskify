import Link from "next/link";

export default function Home() {
  return (
    <>
      <ul>
        <li>
          <Link href="/ButtonTest">▷테스트 페이지</Link>
        </li>
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
          <Link href="/DashBoard/DashBoard">▷대시보드</Link>
        </li>
        <li>
          <Link href="/MyPage/MyPage">▷마이 페이지</Link>
        </li>
        <li>
          <Link href="/ModalTest">▷모달 테스트 페이지</Link>
        </li>
        <li>
          <Link href="/DashBoard/11384/edit">▷대시보드 수정 페이지</Link>
        </li>
      </ul>
    </>
  );
}
