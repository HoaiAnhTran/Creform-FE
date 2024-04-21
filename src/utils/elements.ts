import {
  defaultAddressHeightWidth,
  defaultLongTextHeightWidth,
  defaultShortTextHeightWidth,
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
    default:
      return {
        h: 4,
        w: 12,
      };
  }
};
