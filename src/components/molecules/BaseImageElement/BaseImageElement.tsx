import { Box } from '@mantine/core';
import { Field } from 'formik';

import { useElementLayouts } from '@/contexts';
import { ImageElement } from '@/types';
import { validateImageUrl } from '@/utils';

import { BaseElementProps } from '../FactoryElement';
import { Image } from '../Image';

export const BaseImageElement = (props: BaseElementProps<ImageElement>) => {
  const { item } = props;

  const { isReadOnly } = useElementLayouts();

  return (
    <Box className='flex h-full w-full flex-col gap-0'>
      <Field
        name={`${item.id}.imageUrl`}
        validate={isReadOnly ? validateImageUrl : null}
        component={Image}
        item={item}
        readOnly={isReadOnly}
      />
    </Box>
  );
};
