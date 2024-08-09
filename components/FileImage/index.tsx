import { ChangeEvent, useEffect, useState } from "react";
import styles from "./FileImage.module.scss";
import File_input from "@/public/icons/file_input.svg";
import File_input_img from "@/public/icons/file_input_img.svg";
import { postImage } from "@/lib/modalApi";

interface Props {
  onImageUpload: (url: string) => void;
}

export default function FileInput({ onImageUpload }: Props) {
  const [currentImage, setCurrentImage] = useState<File | null>(null);
  const [prevImage, setPrevImage] = useState<string>();

  useEffect(() => {
    if (!currentImage) return;

    const objectURL = URL.createObjectURL(currentImage);
    setPrevImage(objectURL);

    return () => {
      URL.revokeObjectURL(objectURL);
    };
  }, [currentImage]);

  const handleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setCurrentImage(file);
      try {
        const response = await postImage("38425", file);
        // columnId
        onImageUpload(response.imageUrl);
      } catch (err) {
        console.error("이미지 업로드에 실패했습니다.");
      }
    } else {
      setCurrentImage(null);
    }
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
          <div className={styles["file-input-preview-input"]}>
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
        <div className={styles["file-input-preview"]}>
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
