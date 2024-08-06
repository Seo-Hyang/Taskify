import { ChangeEvent, useEffect, useState } from "react";
import styles from "./FileInput.module.scss";
import File_input from "@/public/icons/file_input.svg";
import File_input_img from "@/public/icons/file_input_img.svg";

export default function FileInput() {
  const [currentImage, setCurrentImage] = useState<File | null>(null);
  const [prevImage, setPrevImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!currentImage) return;

    const objectURL = URL.createObjectURL(currentImage);
    setPrevImage(objectURL);

    return () => {
      setPrevImage(undefined);
      URL.revokeObjectURL(objectURL);
    };
  }, [currentImage]);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCurrentImage(file);
    } else {
      setCurrentImage(null);
    }
  };

  const handleFileChange = () => {
    console.log("이미지 재선택");
  };

  return (
    <div className={styles["file-input-container"]}>
      <input
        type="file"
        className={styles["file-input"]}
        onChange={handleFileInput}
        id="file-input"
      />
      <label htmlFor="file-input" className={styles["file-input-button"]}>
        {prevImage ? (
          <div
            className={styles["file-input-preview-input"]}
            onClick={handleFileChange}
          >
            <File_input_img
              width="30"
              height="30"
              className={styles["file-input-img-already"]}
            />
          </div>
        ) : (
          <File_input width="28" height="28" />
        )}
      </label>
      {prevImage && (
        <div
          className={styles["file-input-preview"]}
        >
          <img
            src={prevImage}
            alt="선택된 이미지"
            className={styles["file-input-img"]}
          />
        </div>
      )}
    </div>
  );
}
