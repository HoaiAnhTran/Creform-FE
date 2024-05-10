import { ElementItem, ElementType } from '.';

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

export interface FormResponse {
  id: number;
  title: string;
  logoUrl: string;
  settings: object;
  elements: ElementItem[];
  totalSubmissions: number;
  permissions: object;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  creatorId: number;
  creator: {
    id: number;
    email: string;
    username: string;
  };
  teamId: number;
  folderId: number;
  folder: {
    id: number;
    name: string;
  };
  favouritedByUsers: {
    id: number;
    email: string;
  };
  isFavourite: boolean;
  disabled: boolean;
}

export interface FormDetailsResponse {
  id: number;
  title: string;
  logoUrl: string;
  settings: object;
  disabled: boolean;
  elements: ElementItem[];
  totalSubmissions: number;
  permissions: object;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  creatorId: number;
  folderId: number;
  teamId: number;
  team: {
    id: number;
    name: string;
    logoUrl: string;
  };
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
  disabled?: boolean;
  title: string;
  logoUrl: string;
  settings: object;
  elements: ElementItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ImportFormResponse {
  title: string;
  settings: object;
  elements: {
    type: ElementType;
    gridSize: {
      x: number;
      y: number;
      w: number;
      h: number;
    };
    config: {
      fieldLabel: string;
      required: boolean;
      [key: string]: unknown;
    };
  }[];
}
