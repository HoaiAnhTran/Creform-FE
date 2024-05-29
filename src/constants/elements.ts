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
  },
  EMAIL: {
    icon: MdEmail,
    type: ElementType.EMAIL,
  },
  FULLNAME: {
    icon: FaUser,
    type: ElementType.FULLNAME,
  },
  ADDRESS: {
    icon: FaLocationDot,
    type: ElementType.ADDRESS,
  },
  PHONE: {
    icon: FaPhoneAlt,
    type: ElementType.PHONE,
  },
  DATEPICKER: {
    icon: FaCalendarAlt,
    type: ElementType.DATEPICKER,
  },
  APPOINTMENT: {
    icon: FaCalendarCheck,
    type: ElementType.APPOINTMENT,
  },
  SHORT_TEXT: {
    icon: PiTextbox,
    type: ElementType.SHORT_TEXT,
  },
  LONG_TEXT: {
    icon: PiTextboxBold,
    type: ElementType.LONG_TEXT,
  },
  DROPDOWN: {
    icon: RxDropdownMenu,
    type: ElementType.DROPDOWN,
  },
  SINGLE_CHOICE: {
    icon: IoMdRadioButtonOn,
    type: ElementType.SINGLE_CHOICE,
  },
  MULTIPLE_CHOICE: {
    icon: IoMdCheckbox,
    type: ElementType.MULTIPLE_CHOICE,
  },
  NUMBER: {
    icon: RiNumber7,
    type: ElementType.NUMBER,
  },
  IMAGE: {
    icon: FaImage,
    type: ElementType.IMAGE,
  },
  FILE_UPLOAD: {
    icon: FaFileUpload,
    type: ElementType.FILE_UPLOAD,
  },
  TIME: {
    icon: MdWatchLater,
    type: ElementType.TIME,
  },
  SUBMIT: {
    icon: BsSendFill,
    type: ElementType.SUBMIT,
  },
  INPUT_TABLE: {
    icon: FaTable,
    type: ElementType.INPUT_TABLE,
  },
  STAR_RATING: {
    icon: FaStar,
    type: ElementType.STAR_RATING,
  },
  SCALE_RATING: {
    icon: FaChartSimple,
    type: ElementType.SCALE_RATING,
  },
  DIVIDER: {
    icon: RxDividerHorizontal,
    type: ElementType.DIVIDER,
  },
  PAGE_BREAK: {
    icon: MdInsertPageBreak,
    type: ElementType.PAGE_BREAK,
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
      { element: ELEMENTS.SCALE_RATING },
    ],
  },
];
