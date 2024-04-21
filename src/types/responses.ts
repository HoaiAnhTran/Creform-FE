export interface FormAnswer {
  elementId: string;
  answers: FieldAnswer[];
}

export interface FieldAnswer {
  fieldId: string;
  text: string;
}
