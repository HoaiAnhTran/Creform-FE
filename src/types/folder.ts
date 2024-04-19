import { FormResponse } from '.';

export interface FolderResponse {
  id: number;
  name: string;
  color: string;
  forms: FormResponse[];
  permissions: object;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  creatorId: number;
}
