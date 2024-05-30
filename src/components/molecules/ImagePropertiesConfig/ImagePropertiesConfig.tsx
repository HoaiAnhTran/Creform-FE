import { ChangeEvent, useRef } from 'react';
import { IoTrash } from 'react-icons/io5';
import { RiImageAddFill } from 'react-icons/ri';
import {
  Box,
  Group,
  Image,
  Overlay,
  Radio,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';

import { Button } from '@/atoms/Button';
import {
  ALLOWED_IMAGE_FILE_TYPES,
  IMAGE_ALIGNMENT_OPTIONS,
  MESSAGES,
} from '@/constants';
import { BasePropertiesProps } from '@/organisms/PropertiesRightbar';
import { useUploadImageMutation } from '@/redux/api/uploadApi';
import { ErrorResponse, ImageElement } from '@/types';
import { capitalize, cn, isEmpty, toastify } from '@/utils';

export const ImagePropertiesConfig = (
  props: BasePropertiesProps<ImageElement>,
) => {
  const { edittingItem, updateItem, handleConfig } = props;

  const imgInputRef = useRef<HTMLInputElement>(null);

  const [uploadImage, { isLoading: isUploadingImage }] =
    useUploadImageMutation();

  const handleChangeImageTitle = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleConfig({
      ...edittingItem?.config,
      imageTitle: event.currentTarget.value,
    });
    updateItem({
      ...edittingItem,
      config: {
        ...edittingItem.config,
        imageTitle: event.currentTarget.value,
      },
    });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files[0];

    if (!ALLOWED_IMAGE_FILE_TYPES.includes(file.type)) {
      toastify.displayError(MESSAGES.ONLY_SUPPORT_IMAGE_FILE_TYPES);
      event.target.value = ''; // Allow to select the same file again
      return;
    }

    uploadImage(file).then((res) => {
      if ('data' in res) {
        handleConfig({
          ...edittingItem?.config,
          imageUrl: res.data.data.url,
        });
        updateItem({
          ...edittingItem,
          config: {
            ...edittingItem.config,
            imageUrl: res.data.data.url,
          },
        });

        event.target.value = '';
        return;
      }
      if (res.error as ErrorResponse) {
        toastify.displayError((res.error as ErrorResponse).message);
      }
    });
  };

  const handleRemoveImage = () => {
    handleConfig({
      ...edittingItem?.config,
      imageUrl: '',
    });
    updateItem({
      ...edittingItem,
      config: {
        ...edittingItem.config,
        imageUrl: '',
      },
    });
  };

  const handleChangeImageAlignment = (value: string) => {
    handleConfig({
      ...edittingItem?.config,
      imageAlignment: value,
    });
    updateItem({
      ...edittingItem,
      config: {
        ...edittingItem.config,
        imageAlignment: value,
      },
    });
  };

  return (
    <>
      <Stack className='justify-between gap-2 p-3'>
        <Text className='text-base font-semibold text-white'>Image Title</Text>
        <TextInput
          autoComplete='off'
          classNames={{
            input:
              'bg-slate-100 text-black border-none outline-none hover:bg-slate-200',
          }}
          value={edittingItem?.config.imageTitle}
          onChange={handleChangeImageTitle}
        />
      </Stack>

      <Stack className='p-3'>
        <Text className='font-semibold text-white'>Image</Text>
        {!isEmpty(edittingItem.config.imageUrl) ? (
          <Box className='group relative mx-auto w-max'>
            <Image
              src={edittingItem.config.imageUrl}
              className='h-28 w-max bg-opacity-90 object-contain'
            />
            <UnstyledButton
              className='absolute left-1/2 top-1/2 z-20 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100/80 bg-opacity-60 text-gray-800 opacity-0 transition-all delay-100 ease-in-out hover:bg-gray-100/90 group-hover:opacity-100'
              onClick={handleRemoveImage}
            >
              <IoTrash size={20} />
            </UnstyledButton>
            <Overlay
              color='#000'
              backgroundOpacity={0.25}
              className='invisible z-10 transition-all duration-100 ease-linear group-hover:visible'
            />
          </Box>
        ) : (
          <>
            <input
              type='file'
              ref={imgInputRef}
              onChange={(event) => handleImageChange(event)}
              className='hidden'
              accept={ALLOWED_IMAGE_FILE_TYPES.join(',')}
            />
            <Button
              title='Upload a file'
              className='bg-slate-200 font-semibold uppercase text-gray-800 transition-all duration-75 ease-linear hover:bg-slate-200/85 hover:text-gray-800 disabled:opacity-60'
              leftSection={<RiImageAddFill size={15} />}
              onClick={() => {
                imgInputRef.current?.click();
              }}
              disabled={isUploadingImage}
              loading={isUploadingImage}
              loaderProps={{
                color: 'dark.4',
              }}
            />
          </>
        )}
      </Stack>

      <Stack className='p-3'>
        <Text className='font-semibold text-white'>Image Alignment</Text>
        <Radio.Group
          value={edittingItem.config.imageAlignment}
          onChange={handleChangeImageAlignment}
        >
          <Group className='justify-between gap-[1px] bg-slate-400'>
            {IMAGE_ALIGNMENT_OPTIONS.map((alignment) => (
              <Radio
                key={alignment}
                value={alignment}
                label={capitalize(alignment)}
                classNames={{
                  inner: 'hidden',
                  label: 'p-0 cursor-pointer',
                  labelWrapper: 'p-3 w-full text-center',
                  root: cn('bg-slate-700 flex-1 text-base text-white', {
                    'bg-ocean-green-400':
                      edittingItem.config.imageAlignment === alignment,
                  }),
                }}
              />
            ))}
          </Group>
        </Radio.Group>
      </Stack>
    </>
  );
};
