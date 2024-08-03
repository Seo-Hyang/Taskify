import React, { ReactNode } from "react";

// interface : 함수 프롭 타입 지정
interface ButtonProps {
  w: string;
  h: string;
  c: string;
  br: string;
  bc: string;
  m: string;
  children: ReactNode;
}

// 기본 스타일 객체
const baseStyles = {
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

/** Button 컴포넌트 props 설명 :
 * w : width
 * h : height
 * c : color
 * br : border-radius
 * bc : background-color
 * m : margin
 */

/** 사용 방법 :
 * prop 기본 값 확인 후 변경을 원하는 prop만 값 전달
 */

/** 컴포넌트 사용 예시 :
 * <Button h="50px" m="24px 0 0">변경</Button>
 */

export default function Button({
  w = "100%",
  h = "100%",
  c = "var(--color-white)",
  br = "8px",
  bc = "var(--color-violet)",
  children,
  m = "24px 0 0",
}: ButtonProps) {
  // 스타일 객체 지정
  const styles = {
    ...baseStyles,
    width: w,
    height: h,
    color: c,
    borderRadius: br,
    backgroundColor: bc,
    margin: m,
  };

  return (
    <>
      <div style={styles}>{children}</div>
    </>
  );
}
