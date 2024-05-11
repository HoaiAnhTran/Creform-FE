export interface InvitationResponse {
  id: string;
  email: string;
  token: string;
  accepted: boolean;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  team: {
    id: string;
    name: string;
  };
  creator: {
    id: string;
    username: string;
    email: string;
  };
}

export interface CreateInvitationPayload {
  teamId: string;
  email: string;
}
