import {
  defaultAddressHeightWidth,
  defaultDropdownHeightWidth,
  defaultLongTextHeightWidth,
  defaultMultipleChoiceHeightWidth,
  defaultShortTextHeightWidth,
  defaultSingleChoiceHeightWidth,
} from '@/configs/defaultElementConfigs';
import { ElementType } from '@/types';

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
    default:
      return {
        h: 4,
        w: 12,
      };
  }
};
