import dayjs from 'dayjs';

import {
  requiredFieldValueSchema,
  requiredStringSchema,
} from './schemas/validation';

export const validateLabel = async (value: string) =>
  await requiredStringSchema
    .validate(value)
    .then(() => {})
    .catch((err) => err.errors[0]);

export const validateFieldValue = async (value: string) =>
  await requiredFieldValueSchema
    .validate(value)
    .then(() => {})
    .catch((err) => err.errors[0]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmpty = (value: any): boolean =>
  value instanceof Date
    ? !dayjs(value).isValid()
    : !value ||
      value === undefined ||
      value === null ||
      Number.isNaN(value) ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value === '') ||
      (Array.isArray(value) && value.length === 0);
