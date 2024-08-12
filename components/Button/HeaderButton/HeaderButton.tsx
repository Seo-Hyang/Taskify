import styles from "@/components/Button/HeaderButton/style.module.scss";
import SETTINGSVG from "@/public/icons/settings_icon.svg";
import AddBox from "@/public/icons/add_box_icon.svg";

interface HeaderProps {
  children: React.ReactNode;
  setting?: boolean;
  isInvitation?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
}

export default function HeaderButton({
  children,
  setting = false,
  isInvitation = false,
  onClick,
  isDisabled = false,
}: HeaderProps) {
  return (
    <button
      className={`${styles.Button} ${setting ? styles.setting : ""} ${
        isDisabled ? styles.disabled : ""
      }`}
      onClick={onClick}
    >
      <SETTINGSVG
        className={`${styles.noneSvg} ${setting ? styles.setting_svg : ""}`}
      />
      <AddBox
        className={`${styles.noneSvg} ${isInvitation ? styles.invitation : ""}`}
      />
      {children}
    </button>
  );
}
