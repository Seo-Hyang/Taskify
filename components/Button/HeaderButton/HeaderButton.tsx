import styles from "@/components/Button/HeaderButton/style.module.scss";
import SETTINGSVG from "@/public/icons/settings_icon.svg";
import AddBox from "@/public/icons/add_box_icon.svg";

export default function HeaderButton({
  children,
  setting = false,
  isInvitation = false,
  onClick = () => {},
}) {
  return (
    <button
      className={`${styles.Button} ${setting ? styles.setting : ""}`}
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
