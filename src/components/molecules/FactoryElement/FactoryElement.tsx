import {
  ElementItem,
  ElementType,
  EmailElement,
  FullnameElement,
  HeadingElement,
  LongTextElement,
  ShortTextElement,
  SubmitElement,
} from '@/types';

import { BaseEmailElement } from '../BaseEmailElement';
import { BaseFullnameElement } from '../BaseFullnameElement';
import { BaseHeadingElement } from '../BaseHeadingElement';
import { BaseLongTextElement } from '../BaseLongTextElement';
import { BaseShortTextElement } from '../BaseShortTextElement';
import { BaseSubmitElement } from '../BaseSubmitElement';

export interface BaseElementProps<T extends ElementItem = ElementItem> {
  item: T;
  isActive: boolean;
  removeItem: (id: string) => void;
  updateItem: (item: T) => void;
  handleConfig: (config: T['config']) => void;
  handleOnChangeAnswer: (
    fieldId: string,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
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
    case isSubmitElement(item):
      return <BaseSubmitElement item={item} {...rest} />;
    case isShortTextElement(item):
      return <BaseShortTextElement item={item} {...rest} />;
    case isLongTextElement(item):
      return <BaseLongTextElement item={item} {...rest} />;
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
export function isShortTextElement(
  item: ElementItem,
): item is ShortTextElement {
  return item?.type === ElementType.SHORT_TEXT;
}

export function isLongTextElement(item: ElementItem): item is LongTextElement {
  return item?.type === ElementType.LONG_TEXT;
}

export function isSubmitElement(item: ElementItem): item is SubmitElement {
  return item?.type === ElementType.SUBMIT;
}
