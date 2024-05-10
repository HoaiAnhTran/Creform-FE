import { ElementItem, FormDetailsResponse, FormRequest } from '@/types';
import { FieldAnswer, FormAnswer } from '@/types/responses';

export const addTextToFieldOfElement = (
  form: FormRequest | FormDetailsResponse,
) => {
  const updatedElements = form.elements.map((element) => {
    const updatedFields = element.fields.map((field) => ({
      ...field,
      text: '',
    }));
    return {
      ...element,
      fields: updatedFields,
    };
  });

  return { ...form, elements: updatedElements };
};

export const removeTextFromFieldOfElement = (form: FormRequest) => {
  const formWithoutText = JSON.parse(JSON.stringify(form));

  formWithoutText.elements.forEach((element: ElementItem) => {
    element.fields.forEach((field) => {
      delete field.text;
    });
  });

  return formWithoutText;
};

export const getFormAnswerFields = (elements: ElementItem[]) => {
  const formAnswers: FormAnswer[] = [];

  for (const element of elements) {
    if (!('fieldLabel' in element.config)) continue;
    const FieldAnswers: FormAnswer = {
      elementId: element.id,
      answers: [],
    };
    for (const field of element.fields) {
      const answer: FieldAnswer = {
        fieldId: field.id,
        text: field.text!,
      };
      FieldAnswers.answers.push(answer);
    }
    formAnswers.push(FieldAnswers);
  }
  return { formAnswers: formAnswers };
};
