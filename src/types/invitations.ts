export interface InvitationResponse {
  id: number;
  email: string;
  token: string;
  accepted: boolean;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  team: {
    id: number;
    name: string;
  };
  creator: {
    id: number;
    username: string;
    email: string;
  };
}

export interface CreateInvitationPayload {
  teamId: number;
  email: string;
}
