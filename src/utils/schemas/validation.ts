import * as yup from 'yup';

import { VALIDATION } from '@/constants';

export const stringRequired = yup
  .string()
  .required(VALIDATION.NOT_EMPTY)
  .min(1, VALIDATION.NOT_EMPTY);
