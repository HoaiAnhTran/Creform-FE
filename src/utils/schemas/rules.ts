import * as Yup from 'yup';

import { RULES, RULES_MESSAGES } from '@/constants/rules';

const MIN_NUMBER_CHARACTER = 8;

const handleConfirmPasswordYup = (refString: string) =>
  Yup.string()
    .required(RULES_MESSAGES.PASSWORD_REQUIRED)
    .min(MIN_NUMBER_CHARACTER, RULES_MESSAGES.PASSWORD_AT_LEAST_EIGHT_CHARACTER)
    .matches(RULES.PASSWORD_COMPLEX, RULES_MESSAGES.PASSWORD_COMPLEX)
    .oneOf([Yup.ref(refString)], RULES_MESSAGES.PASSWORD_NOT_MATCH);

export const accountSchema = Yup.object().shape({
  email: Yup.string()
    .email(RULES_MESSAGES.EMAIL_INVALID)
    .required(RULES_MESSAGES.EMAIL_REQUIRED),
  password: Yup.string()
    .required(RULES_MESSAGES.PASSWORD_REQUIRED)
    .min(MIN_NUMBER_CHARACTER, RULES_MESSAGES.PASSWORD_AT_LEAST_EIGHT_CHARACTER)
    .matches(RULES.PASSWORD_COMPLEX, RULES_MESSAGES.PASSWORD_COMPLEX),
  confirmPassword: handleConfirmPasswordYup('password'),
  username: Yup.string().required(RULES_MESSAGES.USERNAME_REQUIRED),
});
