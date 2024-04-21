import { BiHeading } from 'react-icons/bi';
import { BsSendFill } from 'react-icons/bs';
import {
  FaCalendarAlt,
  FaCalendarCheck,
  FaFileUpload,
  FaImage,
  FaPhoneAlt,
  FaUser,
} from 'react-icons/fa';
import { FaChartSimple, FaLocationDot, FaStar, FaTable } from 'react-icons/fa6';
import { IoMdCheckbox, IoMdRadioButtonOn } from 'react-icons/io';
import { MdEmail, MdInsertPageBreak, MdWatchLater } from 'react-icons/md';
import { PiTextbox, PiTextboxBold } from 'react-icons/pi';
import { RiNumber7 } from 'react-icons/ri';
import { RxDividerHorizontal, RxDropdownMenu } from 'react-icons/rx';

import { ElementType } from '@/types';

export const ELEMENTS = {
  HEADING: {
    icon: BiHeading,
    type: ElementType.HEADING,
    isDisabled: false,
  },
  EMAIL: {
    icon: MdEmail,
    type: ElementType.EMAIL,
    isDisabled: false,
  },
  FULLNAME: {
    icon: FaUser,
    type: ElementType.FULLNAME,
    isDisabled: false,
  },
  ADDRESS: {
    icon: FaLocationDot,
    type: ElementType.ADDRESS,
    isDisabled: false,
  },
  PHONE: {
    icon: FaPhoneAlt,
    type: ElementType.PHONE,
    isDisabled: true,
  },
  DATEPICKER: {
    icon: FaCalendarAlt,
    type: ElementType.DATEPICKER,
    isDisabled: true,
  },
  APPOINTMENT: {
    icon: FaCalendarCheck,
    type: ElementType.APPOINTMENT,
    isDisabled: true,
  },
  SHORT_TEXT: {
    icon: PiTextbox,
    type: ElementType.SHORT_TEXT,
    isDisabled: false,
  },
  LONG_TEXT: {
    icon: PiTextboxBold,
    type: ElementType.LONG_TEXT,
    isDisabled: false,
  },
  DROPDOWN: {
    icon: RxDropdownMenu,
    type: ElementType.DROPDOWN,
    isDisabled: true,
  },
  SINGLE_CHOICE: {
    icon: IoMdRadioButtonOn,
    type: ElementType.SINGLE_CHOICE,
    isDisabled: true,
  },
  MULTIPLE_CHOICE: {
    icon: IoMdCheckbox,
    type: ElementType.MULTIPLE_CHOICE,
    isDisabled: true,
  },
  NUMBER: {
    icon: RiNumber7,
    type: ElementType.NUMBER,
    isDisabled: true,
  },
  IMAGE: {
    icon: FaImage,
    type: ElementType.IMAGE,
    isDisabled: true,
  },
  FILE_UPLOAD: {
    icon: FaFileUpload,
    type: ElementType.FILE_UPLOAD,
    isDisabled: true,
  },
  TIME: {
    icon: MdWatchLater,
    type: ElementType.TIME,
    isDisabled: true,
  },
  SUBMIT: {
    icon: BsSendFill,
    type: ElementType.SUBMIT,
    isDisabled: false,
  },
  INPUT_TABLE: {
    icon: FaTable,
    type: ElementType.INPUT_TABLE,
    isDisabled: true,
  },
  STAR_RATING: {
    icon: FaStar,
    type: ElementType.STAR_RATING,
    isDisabled: true,
  },
  SCALE_RATING: {
    icon: FaChartSimple,
    type: ElementType.STAR_RATING,
    isDisabled: true,
  },
  DIVIDER: {
    icon: RxDividerHorizontal,
    type: ElementType.DIVIDER,
    isDisabled: true,
  },
  PAGE_BREAK: {
    icon: MdInsertPageBreak,
    type: ElementType.PAGE_BREAK,
    isDisabled: true,
  },
};

export const ElementList = [
  {
    title: 'Necessary elements',
    elements: [
      { element: ELEMENTS.HEADING },
      { element: ELEMENTS.EMAIL },
      { element: ELEMENTS.FULLNAME },
      { element: ELEMENTS.ADDRESS },
      { element: ELEMENTS.PHONE },
      { element: ELEMENTS.DATEPICKER },
      { element: ELEMENTS.APPOINTMENT },
    ],
  },
  {
    title: 'Basic elements',
    elements: [
      { element: ELEMENTS.SHORT_TEXT },
      { element: ELEMENTS.LONG_TEXT },
      { element: ELEMENTS.DROPDOWN },
      { element: ELEMENTS.SINGLE_CHOICE },
      { element: ELEMENTS.MULTIPLE_CHOICE },
      { element: ELEMENTS.NUMBER },
      { element: ELEMENTS.IMAGE },
      { element: ELEMENTS.FILE_UPLOAD },
      { element: ELEMENTS.TIME },
      { element: ELEMENTS.SUBMIT },
    ],
  },
  {
    title: 'Survey elements',
    elements: [
      { element: ELEMENTS.INPUT_TABLE },
      { element: ELEMENTS.STAR_RATING },
      { element: ELEMENTS.SCALE_RATING },
    ],
  },
  {
    title: 'Page elements',
    elements: [{ element: ELEMENTS.DIVIDER }, { element: ELEMENTS.PAGE_BREAK }],
  },
];
