// 기본 import
import React from "react";
import { useRouter } from "next/router";
import stylesCss from "@/components/Button/ReturnButton/ReturnButton.module.scss";

// 이미지 import
import LeftArrow from "@/public/images/leftArrow.svg";
import { Children } from "react";

// 함수 프롭 타입 지정
interface ReturnButtonProps {
  w?: string;
  h?: string;
  b?: string;
  f?: string;
  link?: string;
  children?: string;
}

/** returnButton 컴포넌트 사용 방법 :
 * 컴포넌트의 프롭(w, h, b)으로 각각 width, height, border 속성 값을 전달하고
 * children으로 왼쪽 화살표[<] 뒤에 들어갈 내용 입력
 */

/** 사용 예시 :
 * <ReturnButton w="84px" h="26px" b="none">
 *    돌아가기
 * </ReturnButton>
 */

export default function ReturnButton({
  w = "84px",
  h = "26px",
  b = "none",
  f = "16px",
  link = "/",
  children,
}: ReturnButtonProps) {
  const router = useRouter();

  // 스타일 객체 정의
  const styles = {
    returnButtonContainer: {
      width: w,
      height: h,
      border: b,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: f,
      cursor: "pointer",
    },
    icon: {
      marginRight: "8px",
    },
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    router.back();
  };

  return (
    <div
      onClick={handleBack}
      className={stylesCss.returnButtonContainer}
      style={styles.returnButtonContainer}
    >
      <div className={stylesCss.icon}>
        <LeftArrow />
      </div>
      <div className={stylesCss.font}>{children}</div>
    </div>
  );
}
