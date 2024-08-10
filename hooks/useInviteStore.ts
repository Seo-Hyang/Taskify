import { create } from "zustand";

interface State {
  isShowModal: boolean;
  setIsShowModal: (value: boolean) => void;
}

const useInviteStore = create<State>((set) => ({
  isShowModal: false,
  setIsShowModal: (value: boolean) => set({ isShowModal: value }),
}));

export default useInviteStore;
