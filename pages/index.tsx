import Link from "next/link";

export default function Home() {
  return (
    <>
      <ul>
        <li>
          <Link href="/LandingPage">▷랜딩 페이지</Link>
        </li>
        <li>
          <Link href="/Login">▷로그인</Link>
        </li>
        <li>
          <Link href="/SignUp">▷회원가입</Link>
        </li>
        <li>
          <Link href="/DashBoard">▷대시보드</Link>
        </li>

        <li>
          <Link href="/MyPage">▷마이 페이지</Link>
        </li>
      </ul>
    </>
  );
}
