import { Layout as LayoutProps } from 'react-grid-layout';

export interface HeadingConfig {
  headingText: string;
  subheadingText: string;
}

export interface EmailConfig {
  fieldLabel: string;
  required: boolean;
  sublabel: string;
}

export interface FullnameConfig {
  fieldLabel: string;
  required: boolean;
  sublabels: {
    firstName: string;
    lastName: string;
  };
}

export interface TextConfig {
  fieldLabel: string;
  required: boolean;
  placeholder: string;
  sublabel: string;
}

export interface SubmitConfig {
  buttonText: string;
  buttonColor: string;
  buttonAlignment: string;
}

export type ElementConfig =
  | HeadingConfig
  | FullnameConfig
  | EmailConfig
  | TextConfig
  | SubmitConfig;

export enum ElementType {
  HEADING = 'Heading',
  EMAIL = 'Email',
  FULLNAME = 'Fullname',
  ADDRESS = 'Address',
  PHONE = 'Phone',
  DATEPICKER = 'Datepicker',
  APPOINTMENT = 'Appointment',
  SHORT_TEXT = 'Short Text',
  LONG_TEXT = 'Long Text',
  DROPDOWN = 'Dropdown',
  SINGLE_CHOICE = 'Single Choice',
  MULTIPLE_CHOICE = 'Multiple Choice',
  NUMBER = 'Number',
  IMAGE = 'Image',
  FILE_UPLOAD = 'File Upload',
  TIME = 'Time',
  SUBMIT = 'Submit',
  INPUT_TABLE = 'Input Table',
  STAR_RATING = 'Star Rating',
  DIVIDER = 'Divider',
  PAGE_BREAK = 'Page Break',
}

export type GridSize = Pick<LayoutProps, 'x' | 'y' | 'w' | 'h'>;

export interface BaseElement<T extends ElementType, U extends ElementConfig> {
  id: string;
  type: T;
  gridSize: GridSize;
  config: U;
  fields: {
    id: string;
    name: string;
    text?: string;
  }[];
}

export type HeadingElement = BaseElement<ElementType.HEADING, HeadingConfig>;

export type EmailElement = BaseElement<ElementType.EMAIL, EmailConfig>;

export type FullnameElement = BaseElement<ElementType.FULLNAME, FullnameConfig>;

export type ShortTextElement = BaseElement<ElementType.SHORT_TEXT, TextConfig>;

export type LongTextElement = BaseElement<ElementType.LONG_TEXT, TextConfig>;

export type SubmitElement = BaseElement<ElementType.SUBMIT, SubmitConfig>;

export type ElementItem =
  | HeadingElement
  | FullnameElement
  | EmailElement
  | ShortTextElement
  | LongTextElement
  | SubmitElement;
