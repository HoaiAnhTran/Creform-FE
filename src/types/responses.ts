export interface FormAnswer {
  elementId: string;
  answers: FieldAnswer[];
}

export interface FieldAnswer {
  fieldId: string;
  text: string;
}
export interface FormAnswerRequest {
  formAnswers: FormAnswer[];
}

export interface FormAnswerResponse {
  id: number;
  formAnswers: FormAnswer[];
  createdAt: string;
  deletedAt: string;
  formId: number;
}

export interface GetResponsesParams {
  page?: number;
  pageSize?: number;
  searchText?: string;
  sortField?: string;
  sortDirection?: string;
  fieldsFilter?: string;
}

export interface RawResponseRow {
  formAnswers: RawFormAnswerCell[];
  id: number;
  createdAt: Date;
}

export interface RawFormAnswerCell {
  id: string;
  elementName: string;
  answers: RawFieldAnswerCell[];
}

export interface RawFieldAnswerCell {
  id: string;
  fieldName: string;
  text: string;
}

export interface ReturnGetResponses {
  responses: RawResponseRow[];
  page: number;
  pageSize: number;
  totalResponses: number;
  totalPages: number;
}
