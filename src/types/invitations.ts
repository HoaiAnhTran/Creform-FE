export interface InvitationResponse {
  id: number;
  email: string;
  token: string;
  accepted: boolean;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  teamId: number;
}

export interface CreateInvitationPayload {
  teamId: number;
  email: string;
}
