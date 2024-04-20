import * as yup from 'yup';

import { VALIDATION } from '@/constants';

export const stringRequired = yup
  .string()
  .required(VALIDATION.NOT_EMPTY)
  .min(1, VALIDATION.NOT_EMPTY);

export const emailRequired = yup
  .string()
  .trim()
  .min(1, VALIDATION.NOT_EMPTY)
  .email(VALIDATION.INVALID_EMAIL);

export const emailFormat = yup.string().trim().email(VALIDATION.INVALID_EMAIL);
