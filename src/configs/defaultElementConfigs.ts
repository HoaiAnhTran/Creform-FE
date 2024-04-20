import { EmailConfig, HeadingConfig } from '@/types';

export const defaultHeadingConfig: HeadingConfig = {
  headingText: 'Heading',
  subheadingText: 'Subheader',
};
//TODO: update defaultEmailConfig
export const defaultEmailConfig: EmailConfig = {
  fieldLabel: '',
  required: true,
  subLabel: [],
};
