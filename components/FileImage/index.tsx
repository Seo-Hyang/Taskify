import { ChangeEvent, useEffect, useState } from "react";
import styles from "../FileImage/FileImage.module.scss";
import File_input from "@/public/icons/file_input.svg";
import File_input_img from "@/public/icons/file_input_img.svg";
import { postImage } from "@/lib/modalApi";
import Image from "next/image";

interface Props {
  onImageUpload: (url: string) => void;
  initialImageUrl?: string;
  columnId: number;
}

export default function FileInput({
  onImageUpload,
  initialImageUrl,
  columnId,
}: Props) {
  const [currentImage, setCurrentImage] = useState<File | null>(null);
  const [prevImage, setPrevImage] = useState<string | undefined>(
    initialImageUrl
  );

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
      const objectURL = URL.createObjectURL(file);
      setCurrentImage(file);

      try {
        const response = await postImage(columnId, file); // postImage 함수 호출
        onImageUpload(response.imageUrl); // 업로드된 이미지 URL을 부모 컴포넌트로 전달
        setPrevImage(response.imageUrl); // 서버에서 받은 URL로 업데이트
        e.target.value = ""; // 입력 값을 초기화하여 같은 파일을 재선택할 수 있게 함
      } catch (err) {
        console.error("Image upload failed.");
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
            <Image
              src={prevImage}
              alt="Selected"
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
          <Image
            src={prevImage}
            alt="Selected"
            className={styles["file-input-img"]}
          />
        </div>
      )}
    </div>
  );
}
