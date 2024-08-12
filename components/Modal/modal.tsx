import { ReactNode, useEffect, useRef } from "react";
import useModalStore from "@/hooks/useModalStore";

interface Props {
  children: ReactNode;
  className?: string;
  id: string;
}

export default function Dialog({ children, id, ...rest }: Props) {
  const { modals, openModal, closeModal } = useModalStore();
  const isOpen = modals[id] || false;
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      openModal(id);
    }
    return () => {
      closeModal(id);
    };
  }, [id]);

  return (
    <dialog ref={dialogRef} {...rest}>
      {children}
    </dialog>
  );
}
