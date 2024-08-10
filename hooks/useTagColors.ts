import { useState } from "react";

interface TagColors {
  [key: string]: { backgroundColor: string; color: string };
}

export function useTagColors() {
  const [tagColors, setTagColors] = useState<TagColors>({});

  const getRandomColor = () => {
    const colors = [
      { background: "#f9eee3", color: "#d58d49" },
      { background: "#e7f7db", color: "#89d549" },
      { background: "#f7dbf0", color: "#d549b6" },
      { background: "#dbe6f7", color: "#4981d5" },
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const addTagColor = (tag: string) => {
    if (!tagColors[tag]) {
      const { background, color } = getRandomColor();
      setTagColors((prevColors) => ({
        ...prevColors,
        [tag]: { backgroundColor: background, color: color },
      }));
    }
  };

  return {
    tagColors,
    addTagColor,
  };
}
