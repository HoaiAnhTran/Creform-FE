export const RULES_MESSAGES = {
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_AT_LEAST_EIGHT_CHARACTER: 'Password must be at least 8 characters',
  PASSWORD_COMPLEX:
    'Password must contain at least 8 charactes,1 uppercase letter, 1 lowercase letter and 1 special character.',
  PASSWORD_NOT_MATCH: 'Retype password! Password is not match',
  EMAIL_INVALID: 'Invalid email address',
  EMAIL_REQUIRED: 'Email is required',
  USERNAME_REQUIRED: 'Username is required',
} as const;

export const RULES = {
  PASSWORD_COMPLEX: /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z]).{8,}$/,
} as const;
