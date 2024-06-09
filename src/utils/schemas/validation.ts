import * as yup from 'yup';

import { MESSAGES, RULES } from '@/constants';

export const requiredFieldLabelSchema = yup
  .string()
  .required(MESSAGES.NO_EMPTY_STRING);

export const notRequiredSubLabelSchema = yup.string();

export const requiredFieldValueSchema = yup
  .string()
  .required(MESSAGES.REQUIRED_FIELD);

export const requiredEmailSchema = yup
  .string()
  .email(MESSAGES.INVALID_EMAIL)
  .required(MESSAGES.REQUIRED_FIELD);

export const notRequiredEmailSchema = yup
  .string()
  .email(MESSAGES.INVALID_EMAIL);

export const isValidPhoneNumber = yup
  .string()
  .trim()
  .matches(RULES.PHONE_NUMBER_REGEX, 'Please enter a valid phone number.');

export const imageUrlSchema = yup.string().min(1, MESSAGES.NO_EMPTY_IMAGE);
