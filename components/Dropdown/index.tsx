import { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.scss";
import More_vert from "@/public/icons/more_vert_icon.svg";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeButton, setActiveButton] = useState<"edit" | "delete">("edit");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveButton("edit");
    // 수정 모달 띄우기
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveButton("delete");
    // 삭제 모달 띄우기
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
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
      <button className={styles["dropdown-button"]} onClick={toggleDropdown}>
        <More_vert width="28" height="28" />
      </button>
      {isOpen && (
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
