import {
  ElementItem,
  ElementType,
  EmailElement,
  FullnameElement,
  HeadingElement,
} from '@/types';

import { BaseEmailElement } from '../BaseEmailElement';
import { BaseFullnameElement } from '../BaseFullnameElement';
import { BaseHeadingElement } from '../BaseHeadingElement';

export interface BaseElementProps<T extends ElementItem = ElementItem> {
  item: T;
  isActive: boolean;
  removeItem: (id: string) => void;
  updateItem: (item: T) => void;
  handleConfig: (config: T['config']) => void;
}

export const FactoryElement = (props: BaseElementProps) => {
  const { item, ...rest } = props;
  switch (true) {
    case isHeadingElement(item):
      return <BaseHeadingElement item={item} {...rest} />;
    case isEmailElement(item):
      return <BaseEmailElement item={item} {...rest} />;
    case isFullnameElement(item):
      return <BaseFullnameElement item={item} {...rest} />;
    default:
      return <></>;
  }
};

export function isHeadingElement(item: ElementItem): item is HeadingElement {
  return item?.type === ElementType.HEADING;
}

export function isEmailElement(item: ElementItem): item is EmailElement {
  return item?.type === ElementType.EMAIL;
}

export function isFullnameElement(item: ElementItem): item is FullnameElement {
  return item?.type === ElementType.FULLNAME;
}
