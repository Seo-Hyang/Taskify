export interface Card {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;

  assignee: {
    id: number;
    nickname: string;
    profileImageUrl: string;
  };

  imageUrl: string;
  teamId: string;
  dashboardId: string;
  columnId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Cards {
  id: number;
  title: string;
  tags: string[];
  dueDate: string;
  imageUrl: string;
  assignee: {
    nickname: string;
    profileImageUrl: string;
  };
}
