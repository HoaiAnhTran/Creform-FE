import { useEffect } from 'react';
import {
  Box,
  Image as MantineImage,
  ImageProps as MantineImageProps,
  Text,
} from '@mantine/core';
import {
  ErrorMessage,
  FieldInputProps,
  FieldMetaProps,
  FormikErrors,
} from 'formik';

import NoImage from '@/assets/images/no-image.png';
import { DEFAULT_IMAGE_ALIGNMENT, IMAGE_ALIGNMENT_OPTIONS } from '@/constants';
import { ImageElement } from '@/types';
import { cn } from '@/utils/cn';

interface ImageProps extends Omit<MantineImageProps, 'form'> {
  classNameError?: string;
  classNameWrapper?: string;
  field: FieldInputProps<string>;
  form: {
    setFieldValue: (
      field: string,
      value: unknown,
      shouldValidate?: boolean,
    ) => Promise<void | FormikErrors<unknown>>;
  };
  meta: FieldMetaProps<string>;
  classNameLabel?: string;
  item: ImageElement;
  readOnly: boolean;
}

const IMAGE_TITLE_PLACEHOLDER = 'Image Title';

export const Image = (props: ImageProps) => {
  const {
    field,
    classNameWrapper,
    form: { setFieldValue },
    classNameError,
    item,
    readOnly,
  } = props;

  const getAlignmentClass = (imageAlignment: string) => {
    if (!IMAGE_ALIGNMENT_OPTIONS.includes(imageAlignment)) {
      imageAlignment = DEFAULT_IMAGE_ALIGNMENT;
    }
    return (
      {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
      }[imageAlignment] || ''
    );
  };

  const alignment = getAlignmentClass(item.config.imageAlignment);

  useEffect(() => {
    if (item.config.imageUrl) {
      setFieldValue(field.name, item.config.imageUrl);
      return;
    }
    setFieldValue(field.name, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.name, item.config.imageUrl]);

  return (
    <div
      className={cn(
        'flex w-full flex-col justify-center gap-2',
        classNameWrapper,
      )}
    >
      <Text
        className={cn(
          'text-base text-gray-800',
          {
            'text-slate-400': !item.config.imageTitle,
          },
          { invisible: !item.config.imageTitle && !readOnly },
        )}
      >
        {item.config.imageTitle || IMAGE_TITLE_PLACEHOLDER}
      </Text>
      <Box className={`flex ${alignment} max-h-[78%]`}>
        <MantineImage
          src={item.config.imageUrl || NoImage}
          w={item.config.size.width}
          h={item.config.size.height}
          className='max-h-full object-contain'
        />
      </Box>
      <ErrorMessage
        name={field.name}
        render={(msg) => (
          <div className={cn('mt-1 text-xs text-red-600', classNameError)}>
            {msg}
          </div>
        )}
      />
    </div>
  );
};
