import styles from "./index.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import ModalButton from "@/components/Button/ModalButton/ModalButton";
import { TwitterPicker } from "react-color";
import { useRouter } from "next/router";
import Input from "@/components/Input/ModalInput";
import MessageModal from "@/components/Modal/MessageModal";
import useAsync from "@/hooks/useAsync";
import { getDashboard, putDashboard } from "@/services/dashboards";
import { Dashboard } from "@/types/dashboard";
import { useDashboard } from "@/contexts/DashboardContext";
import Skeleton from "@/components/Skeleton";

interface Props {
  id: number;
}

export default function EditDashBoardInfo({ id }: Props) {
  // const [color, setColor] = useState<DashboardColor>("green");
  const { setDashboard } = useDashboard();
  const [dashboardState, setDashboardState] = useState<Dashboard>();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [modalMessage, setModalMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [values, setValues] = useState({
    title: "",
    color: "",
  });

  const router = useRouter();

  const [isLoadingDashboard, loadDashboardError, loadDashboard] =
    useAsync(getDashboard);
  const [isLoadingModifyDashboard, modifyDashboardError, modifyDashboard] =
    useAsync(putDashboard);

  const handleLoadDashboard = async (dashboardId: number) => {
    try {
      const nextDashboard = await loadDashboard(dashboardId);
      setDashboardState(nextDashboard);
    } catch (error: any) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        setIsValid(false);
        setModalMessage(error.response.data.message);
        openModal();
      } else {
        console.error("대시보드 상세 조회 API 에러 발생: ", error);
      }
    }
  };

  const handleModifyDashboard = async (
    dashboardId: number,
    title: string,
    color: string
  ) => {
    const nextDashboard = await modifyDashboard(dashboardId, title, color);
    setDashboardState(nextDashboard);
  };

  useEffect(() => {
    if (!id) return;
    handleLoadDashboard(id);
  }, []);

  // title 없으면 버튼 비활성화
  useEffect(() => {
    setIsDisabled(!values.title);
  }, [values.title]);

  // title input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // color input
  const handleColorChangeComplete = (color: any) => {
    console.log(color);
    setValues((prevValues) => ({
      ...prevValues,
      color: color.hex,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!values.title || !values.color) {
      setModalMessage("대시보드 제목과 컬러를 지정해주세요.");
      openModal();
      return;
    }

    handleModifyDashboard(id, values.title, values.color);
    setDashboard({ id: id, title: values.title });
    setValues((prevValues) => ({
      ...prevValues,
      title: "",
      color: "",
    }));

    setModalMessage("대시보드 수정이 완료되었습니다.");
    openModal();
  };

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
    if (!isValid) {
      router.push("/");
    }
  };

  if (isLoadingDashboard) {
    return <Skeleton mainHeight={356} textHeight={0} textCount={0} />;
  }

  return (
    <>
      <div className={styles.editDashboardInfo}>
        <h1>{dashboardState?.title ?? "No Data"}</h1>
        <div className={styles.infoDetail}>
          <p>대시보드 이름</p>
          <Input
            name="title"
            value={values.title}
            placeholder="변경할 대시보드 이름을 입력해 주세요"
            className={styles.inputTitle}
            type="text"
            onChange={handleInputChange}
          />
          <TwitterPicker
            color={values.color}
            onChangeComplete={handleColorChangeComplete}
            className={styles.dashboardColorPicker}
          />
        </div>
        <ModalButton
          onClick={handleSubmit}
          isComment={true}
          className={styles.btnSubmit}
        >
          변경
        </ModalButton>
      </div>
      <MessageModal
        message={modalMessage}
        isShow={isShowModal}
        onConfirm={closeModal}
      />
    </>
  );
}
