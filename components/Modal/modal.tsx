import useModalStore from "@/hooks/useModalStore";
import { ReactNode, useEffect, useRef } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Dialog({ children, ...rest }: Props) {
  const { isOpen } = useModalStore();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <>
      <dialog ref={dialogRef} {...rest}>
        {children}
      </dialog>
    </>
  );
}
