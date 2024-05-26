import { ElementItem } from './elements';

export interface TemplateResponse {
  id: string;
  name: string;
  thumbnailUrl: string;
  elements: ElementItem[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  creatorId: string;
}
