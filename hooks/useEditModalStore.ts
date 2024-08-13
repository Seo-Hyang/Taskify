import { create } from "zustand";

interface State {
  editModals: { [key: string]: boolean };
  editopenModal: (id: string) => void;
  editcloseModal: (id: string) => void;
}

const useEditModalStore = create<State>((set) => ({
  editModals: {},
  editopenModal: (id: string) =>
    set((state) => ({
      editModals: { ...state.editModals, [id]: true },
    })),
  editcloseModal: (id: string) =>
    set((state) => ({
      editModals: { ...state.editModals, [id]: false },
    })),
}));

export default useEditModalStore;