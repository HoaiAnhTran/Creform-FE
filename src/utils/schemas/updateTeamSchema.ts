import * as yup from 'yup';

import { MESSAGES } from '@/constants';

export const teamNameValidationSchema = yup.object({
  name: yup.string().trim().min(1).required(MESSAGES.REQUIRED_FIELD),
});
