import { EmailConfig, HeadingConfig } from '@/types';

export const defaultHeadingConfig: HeadingConfig = {
  headingText: 'Heading',
  subheadingText: 'Subheader',
};

export const defaultEmailConfig: EmailConfig = {
  fieldLabel: 'Email',
  required: false,
  sublabel: 'example@example.com',
};
