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

export const ELEMENTS = {
  HEADING: {
    type: 'Heading',
    icon: BiHeading,
  },
  FULLNAME: {
    type: 'Fullname',
    icon: FaUser,
  },
  EMAIL: {
    type: 'Email',
    icon: MdEmail,
  },
  ADDRESS: {
    type: 'Address',
    icon: FaLocationDot,
  },
  PHONE: {
    type: 'Phone',
    icon: FaPhoneAlt,
  },
  DATEPICKER: {
    type: 'Datepicker',
    icon: FaCalendarAlt,
  },
  APPOINTMENT: {
    type: 'Appointment',
    icon: FaCalendarCheck,
  },
  SHORT_TEXT: {
    type: 'Short Text',
    icon: PiTextbox,
  },
  LONG_TEXT: {
    type: 'Long Text',
    icon: PiTextboxBold,
  },
  DROPDOWN: {
    type: 'dropdown',
    icon: RxDropdownMenu,
  },
  SINGLE_CHOICE: {
    type: 'Single Choice',
    icon: IoMdRadioButtonOn,
  },
  MULTIPLE_CHOICE: {
    type: 'Multiple Choice',
    icon: IoMdCheckbox,
  },
  NUMBER: {
    type: 'Number',
    icon: RiNumber7,
  },
  IMAGE: {
    type: 'Image',
    icon: FaImage,
  },
  FILE_UPLOAD: {
    type: 'File Upload',
    icon: FaFileUpload,
  },
  TIME: {
    type: 'Time',
    icon: MdWatchLater,
  },
  SUBMIT: {
    type: 'Submit',
    icon: BsSendFill,
  },
  INPUT_TABLE: {
    type: 'Input Table',
    icon: FaTable,
  },
  STAR_RATING: {
    type: 'Star Rating',
    icon: FaStar,
  },
  SCALE_RATING: {
    type: 'Scale Rating',
    icon: FaChartSimple,
  },
  DIVIDER: {
    type: 'Divider',
    icon: RxDividerHorizontal,
  },
  PAGE_BREAK: {
    type: 'Page Break',
    icon: MdInsertPageBreak,
  },
};
export const ElementList = [
  {
    title: 'Necessary elements',
    elements: [
      { id: 1, element: ELEMENTS.HEADING },
      { id: 2, element: ELEMENTS.FULLNAME },
      { id: 3, element: ELEMENTS.EMAIL },
      { id: 4, element: ELEMENTS.ADDRESS },
      { id: 5, element: ELEMENTS.PHONE },
      { id: 6, element: ELEMENTS.DATEPICKER },
      { id: 7, element: ELEMENTS.APPOINTMENT },
    ],
  },
  {
    title: 'Basic elements',
    elements: [
      { id: 8, element: ELEMENTS.SHORT_TEXT },
      { id: 9, element: ELEMENTS.LONG_TEXT },
      { id: 10, element: ELEMENTS.DROPDOWN },
      { id: 11, element: ELEMENTS.SINGLE_CHOICE },
      { id: 12, element: ELEMENTS.MULTIPLE_CHOICE },
      { id: 13, element: ELEMENTS.NUMBER },
      { id: 14, element: ELEMENTS.IMAGE },
      { id: 15, element: ELEMENTS.FILE_UPLOAD },
      { id: 16, element: ELEMENTS.TIME },
    ],
  },
  {
    title: 'Survey elements',
    elements: [
      { id: 17, element: ELEMENTS.INPUT_TABLE },
      { id: 18, element: ELEMENTS.STAR_RATING },
      { id: 29, element: ELEMENTS.SCALE_RATING },
    ],
  },
  {
    title: 'Page elements',
    elements: [
      { id: 20, element: ELEMENTS.DIVIDER },
      { id: 21, element: ELEMENTS.PAGE_BREAK },
    ],
  },
];
