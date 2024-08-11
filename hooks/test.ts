import { create } from "zustand";

type ModalType = 'columnAdd' | 'ToDoModal' | 'ToDoCreate' | null;

interface ModalState {
  modalType: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  modalType: null,
  openModal: (type: ModalType) => set({ modalType: type }),
  closeModal: () => set({ modalType: null }),
}));

export default useModalStore;
