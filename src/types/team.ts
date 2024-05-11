export interface Member {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
}

export interface FolderInTeamResponse {
  id: string;
  name: string;
}

export interface TeamResponse {
  id: string;
  name: string;
  folders: FolderInTeamResponse[];
  logoUrl: string;
  permissions: object;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  creatorId: string;
  members: Member[];
  invitations: {
    id: string;
    email: string;
    accepted: boolean;
    createdAt: string;
    expiresAt: string;
    creator: {
      id: string;
      username: string;
      email: string;
    };
  }[];
}

export interface TeamPayload {
  name?: string;
  logoUrl?: string;
}
