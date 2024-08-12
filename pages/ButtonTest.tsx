import AuthButton from "@/components/Button/AuthButton/AuthButton";
import ModalButton from "@/components/Button/ModalButton/ModalButton";
import PageButton from "@/components/Button/PageButton/PageButton";
import ArrowButton from "@/components/Button/ArrowButton/ArrowButton";
import AddButton from "@/components/Button/AddButton/AddButton";
import HeaderButton from "@/components/Button/HeaderButton/HeaderButton";
import DashboardButton from "@/components/Button/DashboardButton/DashboardButton";

export default function TestPage() {
  return (
    <>
      <div>
        <h1>버튼 예시 페이지</h1>
        <div>
          <HeaderButton setting={true}>관리</HeaderButton>
          <HeaderButton isInvitation={true}>초대하기</HeaderButton>
          {/* <DashboardButton isOwn={true}>비브리지</DashboardButton>
          <AuthButton>로그인</AuthButton>
          <AuthButton>회원가입</AuthButton>
          <AuthButton disabled={true}>사용 불가</AuthButton>
          <AuthButton landing={true}>랜딩 페이지 로그인</AuthButton> */}
          <ModalButton>수락</ModalButton>
          <ModalButton isCancled={true}>거절</ModalButton>
          <ModalButton isComment={true}>입력</ModalButton>
          <PageButton>변경</PageButton>
          <PageButton isCancled={true}>삭제</PageButton>
          <PageButton isInvitation={true}>초대하기</PageButton>
          <ArrowButton leftArrow={true} />
          <ArrowButton rightArrow={true} />
          <AddButton>새로운 대시보드</AddButton>
          <AddButton addTodo={true} />
          <AddButton addColumn={true}>새로운 칼럼 추가하기</AddButton>
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
    </>
  );
}
