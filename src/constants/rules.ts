export const MINIMUM_PASSWORD_LENGTH = 8;

export const RULES = {
  PASSWORD_REGEX: /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z]).{8,}$/,
} as const;
