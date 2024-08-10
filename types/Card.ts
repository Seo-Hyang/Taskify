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
