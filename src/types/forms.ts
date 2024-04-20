import { ElementItem } from '.';

export interface GetFormsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  isDeleted?: number;
  isFavourite?: number;
  sortField?: string;
  sortDirection?: string;
  folderId?: number;
  teamId?: number;
}

export interface FormResponse extends FormRequest {
  id: number;
  totalSubmissions: number;
  permissions: object;

  deletedAt: string;
  creatorId: number;
  teamId: number;
  isFavourite?: boolean;
}

export interface GetFormsResponse {
  forms: FormResponse[];
  page: number;
  pageSize: number;
  totalForms: number;
  totalPages: number;
}

export interface FormRequest {
  id?: number;
  title: string;
  logoUrl: string;
  settings: object;
  elements: ElementItem[];
  teamId?: number;
  createdAt: string;
  updatedAt: string;
}
