import { ShortTextElement, TextConfig } from '@/types';

import { BaseElementProps } from '../FactoryElement';
import { ShortText } from '../TextInput/ShortText';

export const BaseShortTextElement = (
  props: BaseElementProps<ShortTextElement>,
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
    <ShortText item={item} isDisabledValue={true} handleChange={handleChange} />
  );
};
