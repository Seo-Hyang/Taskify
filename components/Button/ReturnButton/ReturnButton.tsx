// 기본 import
import React from "react";

// 이미지 import
import LeftArrow from "@/public/images/leftArrow.svg";
import { Children } from "react";

// 함수 프롭 타입 지정
interface ReturnButtonProps {
  w: string;
  h: string;
  b: any;
  children?: string;
}

/** returnButton 컴포넌트 사용 방법
 * 컴포넌트의 프롭(w, h, b)으로 각각 width, height, border 속성 값을 전달하고
 * children으로 왼쪽 화살표[<] 뒤에 들어갈 내용 입력 
 * ex. <ReturnButton w="84px" h="26px" b="none">
          돌아가기
        </ReturnButton>

  결과 : < 돌아가기
 */

export default function ReturnButton({
  w = "84px",
  h = "26px",
  b = "none",
  children,
}: ReturnButtonProps) {
  // 스타일 객체 정의
  const styles = {
    returnButtonContainer: {
      width: w,
      height: h,
      border: b,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "16px",
    },
    icon: {
      marginRight: "8px",
    },
  };

  return (
    <div style={styles.returnButtonContainer}>
      <div style={styles.icon}>
        <LeftArrow />
      </div>
      <div>{children}</div>
    </div>
  );
}
