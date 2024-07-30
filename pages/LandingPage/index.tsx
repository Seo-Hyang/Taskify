import styles from "./LandingPage.module.scss";
import header from "@/public/images/logo/header.svg";
import top_Image from "@/public/images/card_image4.png";
import landing_section1 from "@/public/images/landing_section1.png";
import landing_section2 from "@/public/images/landing_section2.png";
import landing_section3 from "@/public/images/landing_section3.png";
import landing_section4 from "@/public/images/landing_section4.png";
import landing_section5 from "@/public/images/landing_section5.png";
import Image from "next/image";
import Footer from "@/components/Footer/Footer";

export default function LandingPage() {
  return (
    <div className={styles["landing-container"]}>

      <header>
        <Image src={header} alt="로고" width="121" height="39" />
        <div className={styles["landing-login"]}>
        <span className={styles["landing-login-txt"]}>로그인</span>
        <span className={styles["landing-login-txt"]}>회원가입</span>
        </div>
      </header>

      <div className={styles["top-section"]}>
        <Image src={top_Image} alt="상단 이미지" width="722" height="422" />
        <h1 className={`${styles["top-section-h1"]} ${styles.white}`}>새로운 일정 관리<h1 className={`${styles["top-section-h1"]} ${styles.white}`}>Taskify</h1></h1>
        <span className={styles["top-section-description"]}>스마트하게 나의 일정을 관리해보자!</span>
        <button className={styles.loginBtn}>로그인하기</button>
      </div>

      <section className={styles["section-point"]}>
        <div className={styles["section-point-container"]}>
          <p className={styles["section-point-p"]}>Point 1</p>
          <h2 className={styles["section-point-h2"]}>일의 우선순의를 <br/> 관리하세요</h2>
        </div>
        <Image src={landing_section1} alt="우선순위" width="594" height="494" />
      </section>

      <section className={styles["section-point"]}>
      <div className={styles["section-point-container"]}>
          <p className={styles["section-point-p"]}>Point 2</p>
          <h2 className={styles["section-point-h2"]}>해야 할 일을 <br/> 등록하세요</h2>
        </div>
        <Image src={landing_section2} alt="할 일 생성" width="436" height="502" />
      </section>

      <div className={styles["bottom-section"]}>
        <h1 className={styles["bottom-section-h1"]}>생산성을 높이는 다양한 설정 ⚡</h1>
        <div className={styles["bottom-section-container"]}>

          <section className={styles["bottom-section-container-section"]}>
            <div className={styles["bottom-section-container-img"]}>
              <Image src={landing_section3} alt="대시보드" width="300" height="123" />
            </div>
            <div className={styles["bottom-section-container-txt"]}>
              <h3 className={styles["bottom-section-container-h3"]}>대시보드 설정</h3>
              <span className={styles["bottom-section-container-span"]}>대시보드 사진과 이름을 변경할 수 있어요.</span>
            </div>
          </section>

          <section className={styles["bottom-section-container-section"]}>
            <div className={styles["bottom-section-container-img"]}>
              <Image src={landing_section4} alt="초대" width="300" height="230" />
            </div>
            <div className={styles["bottom-section-container-txt"]}>
              <h3 className={styles["bottom-section-container-h3"]}>초대</h3>
              <span className={styles["bottom-section-container-span"]}>새로운 팀원을 초대할 수 있어요.</span>
            </div>
          </section>

          <section className={styles["bottom-section-container-section"]}>
            <div className={styles["bottom-section-container-img"]}>
              <Image src={landing_section5} alt="대시보드" width="300" height="123" />
            </div>
            <div className={styles["bottom-section-container-txt"]}>
              <h3 className={styles["bottom-section-container-h3"]}>구성원</h3>
              <span className={styles["bottom-section-container-span"]}>구성원을 초대하고 내보낼 수 있어요.</span>
            </div>
          </section>

        </div>
      </div>
      <Footer />
    </div>
  );
}
