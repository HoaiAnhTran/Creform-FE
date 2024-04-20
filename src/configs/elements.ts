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
    type: 'Fullname',
  },
  ADDRESS: {
    icon: FaLocationDot,
    type: 'Address',
  },
  PHONE: {
    icon: FaPhoneAlt,
    type: 'Phone',
  },
  DATEPICKER: {
    icon: FaCalendarAlt,
    type: 'Datepicker',
  },
  APPOINTMENT: {
    icon: FaCalendarCheck,
    type: 'Appointment',
  },
  SHORT_TEXT: {
    icon: PiTextbox,
    type: 'Short Text',
  },
  LONG_TEXT: {
    icon: PiTextboxBold,
    type: 'Long Text',
  },
  DROPDOWN: {
    icon: RxDropdownMenu,
    type: 'Dropdown',
  },
  SINGLE_CHOICE: {
    icon: IoMdRadioButtonOn,
    type: 'Single Choice',
  },
  MULTIPLE_CHOICE: {
    icon: IoMdCheckbox,
    type: 'Multiple Choice',
  },
  NUMBER: {
    icon: RiNumber7,
    type: 'Number',
  },
  IMAGE: {
    icon: FaImage,
    type: 'Image',
  },
  FILE_UPLOAD: {
    icon: FaFileUpload,
    type: 'File Upload',
  },
  TIME: {
    icon: MdWatchLater,
    type: 'Time',
  },
  SUBMIT: {
    icon: BsSendFill,
    type: 'Submit',
  },
  INPUT_TABLE: {
    icon: FaTable,
    type: 'Input Table',
  },
  STAR_RATING: {
    icon: FaStar,
    type: 'Star Rating',
  },
  SCALE_RATING: {
    icon: FaChartSimple,
    type: 'Scale Rating',
  },
  DIVIDER: {
    icon: RxDividerHorizontal,
    type: 'Divider',
  },
  PAGE_BREAK: {
    icon: MdInsertPageBreak,
    type: 'Page Break',
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
