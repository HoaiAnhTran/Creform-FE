import { EmailConfig, FullnameConfig, HeadingConfig } from '@/types';

export const defaultHeadingConfig: HeadingConfig = {
  headingText: 'Heading',
  subheadingText: 'Subheader',
};

export const defaultEmailConfig: EmailConfig = {
  fieldLabel: 'Email',
  required: false,
  sublabel: 'example@example.com',
};

export const defaultFullnameConfig: FullnameConfig = {
  fieldLabel: 'Name',
  required: false,
  sublabels: {
    firstName: 'First Name',
    lastName: 'Last Name',
  },
};
