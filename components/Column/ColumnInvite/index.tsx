import ModalButton from "@/components/Button/ModalButton/ModalButton";
import styles from "../Column.module.scss";
import Close_modal from "@/public/icons/modal_close.svg";
import Close_modal_mobile from "@/public/icons/modal_close_mobile.svg";
import { MOBILE_MAX_WIDTH } from "@/constants/screensize";
import useWindowSize from "@/hooks/useDevice";
import Input from "@/components/Input/ModalInput";
import { ChangeEvent, useState } from "react";
import { postcolumnInvite } from "@/lib/columnApi";
import { useRouter } from "next/router";


export default function ColumnInvite(dashboardId:string) {
  const { width } = useWindowSize();
  const [isDisabled, setIsDisabled] = useState(true);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    if (isValidEmail(inputEmail)) {
      setIsDisabled(false);
      setError(false);
    } else {
      setIsDisabled(true);
      setError(true);
    }
  };

  const handleInviteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await postcolumnInvite(dashboardId, email);
    } catch (err) {
      console.error("초대 요청에 실패했습니다.");
    }
  };

  return (
    <div className={styles["column-auth"]}>
      <div className={styles["column-auth-container"]}>
        <div className={styles["column-container-close"]}>
          <h1 className={`${styles["column-h1"]} ${styles.auth}`}>초대하기</h1>
          <button className={styles["column-close-button"]}>
            {width > MOBILE_MAX_WIDTH ? (
              <Close_modal width="36" height="36" />
            ) : (
              <Close_modal_mobile width="24" height="24" />
            )}
          </button>
        </div>
        <div className={styles["column-add-label-container"]}>
          <label className={styles["column-label"]}>이메일</label>
          <Input
            onChange={handleEmailChange}
            placeholder="이메일을 입력해 주세요"
            value={email}
          />
          {error && (
            <div className={styles["error-message"]}>
              유효한 이메일을 입력해 주세요.
            </div>
          )}
        </div>
        <div className={styles["column-button-container"]}>
          <ModalButton isCancled={true}>취소</ModalButton>
          <ModalButton
            isComment={true}
            isDisabled={isDisabled}
            onClick={handleInviteClick}
          >
            초대
          </ModalButton>
        </div>
      </div>
    </div>
  );
}
