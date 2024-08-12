export interface Dashboard {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  createdByMe: boolean;
}

export interface DashboardMember {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
  userId: number;
}

export interface DashboardInvitation {
  id: number;
  inviter: {
    id: number;
    email: string;
    nickname: string;
  };
  teamId: string;
  dashboard: {
    id: 11370;
    title: string;
  };
  invitee: {
    id: 4432;
    email: string;
    nickname: string;
  };
  inviteAccepted: boolean | null;
  createdAt: string;
  updatedAt: string;
}
