import { LongTextElement, TextConfig } from '@/types';

import { BaseElementProps } from '../FactoryElement';
import { LongText } from '../Textarea';

export const BaseLongTextElement = (
  props: BaseElementProps<LongTextElement>,
) => {
  const { item, updateItem, handleConfig } = props;
  const handleChange =
    (key: keyof TextConfig) => (event: React.ChangeEvent<HTMLInputElement>) => {
      handleConfig({
        ...item.config,
        [key]: event.currentTarget.value,
      });
      updateItem({
        ...item,
        config: {
          ...item.config,
          [key]: event.currentTarget.value,
        },
      });
    };

  return (
    <LongText item={item} isDisabledValue={true} handleChange={handleChange} />
  );
};
