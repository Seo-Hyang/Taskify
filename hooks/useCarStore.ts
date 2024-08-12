import create from 'zustand';

interface Assignee {
  userId?: number;
  id?: number;
  nickname?: string;
  profileImageUrl?: string | null;
}

interface CardData {
    title: string;
    description: string;
    dueDate: string;
    tags: string[];
    imageUrl: string;
    assignee: Assignee;
    columnId?:number;
  }

interface CardState {
  card: CardData | null;
  setCard: (card: CardData | null) => void;
}

export const useCardStore = create<CardState>((set) => ({
  card: null,
  setCard: (card) => set({ card }),
}));
