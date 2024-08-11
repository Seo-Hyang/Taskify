import { useState } from "react";

const pastelColors = [
  { background: "#F9EEE3", text: "#D58D49" },
  { background: "#E7F7DB", text: "#6B9C2F" },
  { background: "#F7DBF0", text: "#D549B6" },
  { background: "#DBE6F7", text: "#4981D5" },
  { background: "#FCE6E8", text: "#D43F56" },
  { background: "#E3F2FD", text: "#1E88E5" },
  { background: "#F2E2F0", text: "#D870A1" },
  { background: "#E2F3E7", text: "#3D9970" },
  { background: "#F5F3E5", text: "#D8A77F" },
  { background: "#E6F1F5", text: "#00A3E0" },
  { background: "#F9F0F5", text: "#B63F6C" },
  { background: "#E9F5E1", text: "#7D9A5F" },
  { background: "#F6F9E9", text: "#82BE96" },
  { background: "#F2F0F0", text: "#B8B8B8" },
  { background: "#F1F6F4", text: "#8B9A5B" },
  { background: "#F0E5F4", text: "#B53F76" },
];

const generatePastelColorFromHash = (tag: string) => {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % pastelColors.length;
  return pastelColors[index];
};

interface TagColors {
  [key: string]: { backgroundColor: string; color: string };
}

export function useTagColors() {
  const [tagColors, setTagColors] = useState<TagColors>({});

  const addTagColor = (tag: string) => {
    if (!tagColors[tag]) {
      const { background, text } = generatePastelColorFromHash(tag);
      setTagColors((prevColors) => ({
        ...prevColors,
        [tag]: { backgroundColor: background, color: text },
      }));
    }
  };

  return {
    tagColors,
    addTagColor,
  };
}
