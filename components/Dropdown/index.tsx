import { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.scss";
import More_vert from "@/public/icons/more_vert_icon.svg";
import useModalStore from "@/hooks/useModalStore";
import ColumnEdit from "../Column/ColumnEdit";
import ColumnDelete from "../Column/ColumnDelete";

export default function Dropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeButton, setActiveButton] = useState<"edit" | "delete">();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModalStore();

  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveButton("edit");
    openModal();
  };

  // 이중 모달
  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveButton("delete");
    openModal();
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={styles["dropdown-container"]}>
      {/* <ColumnEdit columnId = "38425" dashboardId = "11370"/> */}
      {/* <ColumnDelete columnId = "38425" /> */}
      <button className={styles["dropdown-button"]} onClick={toggleDropdown}>
        <More_vert width="28" height="28" />
      </button>
      {isDropdownOpen && (
        <>
          <div className={styles["dropdown-menu-container"]}>
            <button
              className={`${styles["dropdown-menu"]} ${
                activeButton === "edit" ? styles["dropdown-menu-active"] : ""
              }`}
              onClick={handleEditClick}
            >
              수정하기
            </button>
            <button
              className={`${styles["dropdown-menu"]} ${
                activeButton === "delete" ? styles["dropdown-menu-active"] : ""
              }`}
              onClick={handleDeleteClick}
            >
              삭제하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}
