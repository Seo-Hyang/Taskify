import { ChangeEvent, useEffect, useState } from "react";
import styles from "../FileImage/FileImage.module.scss";
import File_input from "@/public/icons/file_input.svg";
import File_input_img from "@/public/icons/file_input_img.svg";
import { postImage } from "@/lib/modalApi";

interface Props {
  onImageUpload: (url: string) => void;
  initialImageUrl?: string; // 선택적 초기 이미지 URL 속성
}

export default function FileInput({ onImageUpload, initialImageUrl }: Props) {
  const [currentImage, setCurrentImage] = useState<File | null>(null);
  const [prevImage, setPrevImage] = useState<string | undefined>(initialImageUrl);

  useEffect(() => {
    if (initialImageUrl) {
      setPrevImage(initialImageUrl);
    }
  }, [initialImageUrl]);

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
      // 파일이 이전 이미지와 다를 경우만 업로드 수행
      if (!prevImage || URL.createObjectURL(file) !== prevImage) {
        setCurrentImage(file);
        try {
          const response = await postImage("38425", file); // postImage 함수 호출
          onImageUpload(response.imageUrl); // 업로드된 이미지 URL을 부모 컴포넌트로 전달
          // 이전 이미지를 업데이트하여 중복 업로드 방지
          setPrevImage(response.imageUrl);
          // 입력 값을 초기화하여 같은 파일을 재선택할 수 있게 함
          e.target.value = "";
        } catch (err) {
          console.error("Image upload failed.");
        }
      } else {
        console.log("Same file, no upload needed.");
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
            alt="Selected"
            className={styles["file-input-img"]}
          />
        </div>
      )}
    </div>
  );
}