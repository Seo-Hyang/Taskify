import styles from "./LandingPage.module.scss";
import Header from "@/public/images/logo/header_logo.svg";
import Top_Image from "@/public/images/card_image4.png";
import Landing_section1 from "@/public/images/landing_section1.png";
import Landing_section2 from "@/public/images/landing_section2.png";
import Landing_section3 from "@/public/images/landing3.png";
import Landing_section4 from "@/public/images/landing_section4.png";
import Landing_section5 from "@/public/images/landing_section5.png";
import Header_mobile from "@/public/icons/header_mobile.svg";
import Footer from "@/components/Footer/Footer";
import AuthButton from "@/components/Button/AuthButton/AuthButton";
import { MOBILE_MAX_WIDTH } from "@/constants/screensize";
import useWindowSize from "@/hooks/useDevice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { width } = useWindowSize();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoading(true);
      setTimeout(() => {
        router.push("/dashboards");
      }, 1000);
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <BeatLoader color="#9747FF" margin={5} size={15} />
      </div>
    );
  }
  return (
    <div className={styles.landing}>
      <header className={styles.header}>
        <Link href="/LandingPage">
          {width > MOBILE_MAX_WIDTH ? (
            <Header width="121" height="39" />
          ) : (
            <Header_mobile width="23.63" height="27.13" />
          )}
        </Link>

        <div className={styles["landing-login"]}>
          <Link href="/login">
            <span className={styles["landing-login-txt"]}>로그인</span>
          </Link>
          <Link href="/signup">
            <span className={styles["landing-login-txt"]}>회원가입</span>
          </Link>
        </div>
      </header>

      <div className={styles["top-section"]}>
        <Image
          src={Top_Image.src}
          alt="상단 이미지"
          width={722}
          height={422}
          className={styles.topImg}
        />
        <div className={styles["top-section-h1-container"]}>
          <h1 className={styles.white}>새로운 일정 관리</h1>
          <h1 className={styles.purple}>Taskify</h1>
        </div>
        <Link href="/Login" className={styles["loginBtn-link"]}>
          <AuthButton
            disabled={false}
            landing={true}
            className={styles.loginBtn}
          >
            로그인하기
          </AuthButton>
        </Link>
      </div>

      <div className={styles["landing-container"]}>
        <div className={styles["section-point-div"]}>
          <section className={styles["section-point"]}>
            <div className={styles["section-point-container-div"]}>
              <p className={styles["section-point-p"]}>Point 1</p>
              <h2 className={styles["section-point-h2"]}>
                일의 우선순위를 <br /> 관리하세요
              </h2>
            </div>
            <Image
              src={Landing_section1.src}
              alt="우선순위"
              width={594}
              height={494}
              className={`${styles.pointImg} ${styles["section_1"]}`}
            />
          </section>

          <section className={`${styles["section-point"]} ${styles.reverse}`}>
            <div
              className={`${styles["section-point-container-div"]} ${styles["padding-left"]}`}
            >
              <p className={styles["section-point-p"]}>Point 2</p>
              <h2 className={styles["section-point-h2"]}>
                해야 할 일을 <br /> 등록하세요
              </h2>
            </div>
            <Image
              src={Landing_section2.src}
              alt="할 일 생성"
              width={436}
              height={502}
              className={`${styles.pointImg} ${styles["section_2"]}`}
            />
          </section>
        </div>

        <div className={styles["bottom-section"]}>
          <h1 className={styles["bottom-section-h1"]}>
            생산성을 높이는 다양한 설정 ⚡
          </h1>
          <div className={styles["bottom-section-container"]}>
            <section className={styles["bottom-section-container-section"]}>
              <div className={styles["bottom-section-container-img"]}>
                <Image
                  src={Landing_section3.src}
                  alt="대시보드"
                  width={300}
                  height={123}
                  className={styles["section_3"]}
                />
              </div>
              <div className={styles["bottom-section-container-txt"]}>
                <h3 className={styles["bottom-section-container-h3"]}>
                  대시보드 설정
                </h3>
                <span className={styles["bottom-section-container-span"]}>
                  대시보드 사진과 이름을 변경할 수 있어요.
                </span>
              </div>
            </section>

            <section className={styles["bottom-section-container-section"]}>
              <div className={styles["bottom-section-container-img"]}>
                <Image
                  src={Landing_section4.src}
                  alt="초대"
                  width="300"
                  height="230"
                  className={styles["section_4"]}
                />
              </div>
              <div className={styles["bottom-section-container-txt"]}>
                <h3 className={styles["bottom-section-container-h3"]}>초대</h3>
                <span className={styles["bottom-section-container-span"]}>
                  새로운 팀원을 초대할 수 있어요.
                </span>
              </div>
            </section>

            <section className={styles["bottom-section-container-section"]}>
              <div className={styles["bottom-section-container-img"]}>
                <Image
                  src={Landing_section5.src}
                  alt="구성원"
                  width={300}
                  height={195.48}
                  className={styles["section_5"]}
                />
              </div>
              <div className={styles["bottom-section-container-txt"]}>
                <h3 className={styles["bottom-section-container-h3"]}>
                  구성원
                </h3>
                <span className={styles["bottom-section-container-span"]}>
                  구성원을 초대하고 내보낼 수 있어요.
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
