import * as yup from 'yup';

import { MESSAGES } from '@/constants';

const googleFormsUrlRegex =
  /^(https?):\/\/(www\.)?docs\.google\.com\/forms\/d\/[a-zA-Z0-9_-]+\/edit$/;

export const importFormSchema = yup.object({
  formUrl: yup
    .string()
    .url(MESSAGES.INVALID_URL)
    .matches(googleFormsUrlRegex, MESSAGES.INVALID_GOOGLE_FORMS_URL)
    .required(MESSAGES.REQUIRED_FIELD),
});
