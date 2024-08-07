import { ChangeEvent, useEffect, useState } from "react";
import styles from "./FileImage.module.scss";
import File_input from "@/public/icons/file_input.svg";
import File_input_img from "@/public/icons/file_input_img.svg";
import axios from "@/lib/axios";

interface FIleInputProps {
  name: string;
  onChange: (file: File | null) => void;
  initialImageUrl?:string;
  columnId:number;
}

export default function FileInput({ name, onChange,initialImageUrl,columnId }: FIleInputProps) {
  const [currentImage, setCurrentImage] = useState<File | null>(null);
  const [prevImage, setPrevImage] = useState<string | undefined>(initialImageUrl);

  useEffect(() => {
    if (!currentImage) return;

    const objectURL = URL.createObjectURL(currentImage);
    setPrevImage(objectURL);

    return () => {
      setPrevImage(undefined);
      URL.revokeObjectURL(objectURL);
    };
  }, [currentImage]);

  const handleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setCurrentImage(file ?? null);
    onChange(file ?? null);

    if (file) {
      try {
        const uploadedImageUrl = await uploadImage(file);
        setPrevImage(uploadedImageUrl);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(`/columns/${columnId}/card-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.imgUrl; // 서버에서 받은 이미지 URL 반환
  };
  
  return (
    <div className={styles["file-input-container"]}>
      <input
        type="file"
        name={name}
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
