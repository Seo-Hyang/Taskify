import AuthButton from "@/components/Button/AuthButton/AuthButton";
import ModalButton from "@/components/Button/ModalButton/ModalButton";
import PageButton from "@/components/Button/PageButton/PageButton";

export default function TestPage() {
  return (
    <div>
      <h1>테스트 및 예시 페이지</h1>
      <div>
        <div>버튼 테스트</div>
        <AuthButton>로그인</AuthButton>
        <AuthButton>회원가입</AuthButton>
        <AuthButton disabled={true}>사용 불가</AuthButton>
        <AuthButton landing={true}>랜딩 페이지 로그인</AuthButton>
        <ModalButton>수락</ModalButton>
        <ModalButton isCancled={true}>거절</ModalButton>
        <ModalButton isComment={true}>입력</ModalButton>
        <PageButton>변경</PageButton>
        <PageButton isCancled={true}>삭제</PageButton>
        <PageButton isInvitation={true}>초대하기</PageButton>
      </div>
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          margin: 2px;
          gap: 4px;
        }
      `}</style>
    </div>
  );
}
