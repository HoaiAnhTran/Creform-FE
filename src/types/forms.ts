export interface GetFormsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  isDeleted?: number;
  isFavourite?: number;
  sortField?: string;
  sortDirection?: string;
}

export interface FormResponse {
  id: number;
  title: string;
  logoUrl: string;
  settings: object;
  totalSubmissions: number;
  elements: object;
  permissions: object;
  createdAt: string;
  updatedAt: string;
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
