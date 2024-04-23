import { TeamResponse } from './team';

export interface InvitationResponse {
  id: number;
  email: string;
  token: string;
  accepted: boolean;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  team: TeamResponse;
}

export interface CreateInvitationPayload {
  teamId: number;
  email: string;
}
