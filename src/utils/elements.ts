import {
  defaultAddressHeightWidth,
  defaultDropdownHeightWidth,
  defaultElementHeightWidth,
  defaultFileUploadHeightWidth,
  defaultHeadingHeightWidth,
  defaultImageHeightWidth,
  defaultInputTableHeightWidth,
  defaultLongTextHeightWidth,
  defaultMultipleChoiceHeightWidth,
  defaultScaleRatingHeightWidth,
  defaultShortTextHeightWidth,
  defaultSingleChoiceHeightWidth,
  defaultSubmitHeightWidth,
  defaultTimeHeightWidth,
} from '@/constants';
import { ElementType, ScaleRatingElement } from '@/types';

export const getDefaultWidthHeight = (type: ElementType | undefined) => {
  switch (true) {
    case type === ElementType.SHORT_TEXT:
      return defaultShortTextHeightWidth;
    case type === ElementType.LONG_TEXT:
      return defaultLongTextHeightWidth;
    case type === ElementType.ADDRESS:
      return defaultAddressHeightWidth;
    case type === ElementType.DROPDOWN:
      return defaultDropdownHeightWidth;
    case type === ElementType.SINGLE_CHOICE:
      return defaultSingleChoiceHeightWidth;
    case type === ElementType.MULTIPLE_CHOICE:
      return defaultMultipleChoiceHeightWidth;
    case type === ElementType.TIME:
      return defaultTimeHeightWidth;
    case type === ElementType.SCALE_RATING:
      return defaultScaleRatingHeightWidth;
    case type === ElementType.HEADING:
      return defaultHeadingHeightWidth;
    case type === ElementType.SUBMIT:
      return defaultSubmitHeightWidth;
    case type === ElementType.FILE_UPLOAD:
      return defaultFileUploadHeightWidth;
    case type === ElementType.INPUT_TABLE:
      return defaultInputTableHeightWidth;
    case type === ElementType.IMAGE:
      return defaultImageHeightWidth;
    default:
      return defaultElementHeightWidth;
  }
};

export const getScaleRatingValues = (element: ScaleRatingElement) => {
  const values: number[] = [];
  for (
    let index = element.config.lowestRatingValue;
    index <= element.config.highestRatingValue;
    index++
  ) {
    values.push(index);
  }
  return values;
};
