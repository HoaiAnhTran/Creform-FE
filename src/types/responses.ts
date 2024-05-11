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
  id: string;
  formAnswers: FormAnswer[];
  createdAt: string;
  deletedAt: string;
  formId: string;
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
  id: string;
  createdAt: Date;
}

export interface RawFormAnswerCell {
  elementId: string;
  elementType: string;
  elementName: string;
  answers: RawFieldAnswerCell[];
}

export interface RawFieldAnswerCell {
  fieldId: string;
  fieldName: string;
  text: string;
}

export interface ElementIdAndName {
  elementId: string;
  elementName: string;
}

export interface ReturnGetResponses {
  elementIdAndNameList: ElementIdAndName[];
  responses: RawResponseRow[];
  page: number;
  pageSize: number;
  totalResponses: number;
  totalPages: number;
}
