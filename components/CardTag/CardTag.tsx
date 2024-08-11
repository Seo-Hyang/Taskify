import styles from "@/components/CardTag/style.module.scss";
import { useTagColors } from "@/hooks/useTagColors";
import { useEffect } from "react";

export default function CardTag({ children }: { children: string }) {
  const { tagColors, addTagColor } = useTagColors();

  useEffect(() => {
    addTagColor(children);
  }, [children, addTagColor]);

  return (
    <>
      <section className={styles.container}>
        <div
          className={styles.tag_text}
          style={{
            backgroundColor: tagColors[children]?.backgroundColor,
            color: tagColors[children]?.color,
          }}
        >
          {children}
        </div>
      </section>
    </>
  );
}
