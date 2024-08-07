import React, { ReactNode, CSSProperties } from "react";
import ButtonStyle from "@/components/Button/Button/Button.module.scss";

// interface : 함수 프롭 타입 지정
interface ButtonProps {
  w?: string;
  h?: string;
  c?: string;
  br?: string;
  bc?: string;
  m?: string;
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => Promise<void>;
}

// 기본 스타일 객체
const baseStyles = {
  textAlign: "center" as CSSProperties["textAlign"],
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
  m = "24px 0 0",
  disabled = false,
  children,
  onClick,
}: ButtonProps) {
  // 스타일 객체 지정
  const styles = {
    ...baseStyles,
    width: w,
    height: h,
    color: c,
    borderRadius: br,
    backgroundColor: disabled ? "var(--color-gray-400)" : bc,
    margin: m,
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <>
      <button
        style={styles}
        disabled={disabled}
        className={ButtonStyle.button}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}
