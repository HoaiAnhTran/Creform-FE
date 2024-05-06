import { ChangeEvent, useEffect, useRef } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { IoClose, IoTrash } from 'react-icons/io5';
import {
  Box,
  CloseButton,
  Divider,
  Image,
  LoadingOverlay,
  Stack,
} from '@mantine/core';

import { Button } from '@/atoms/Button';
import { ALLOWED_IMAGE_FILE_TYPES } from '@/constants';
import { MESSAGES } from '@/constants/messages';
import { useBuildFormContext, useElementLayouts } from '@/contexts';
import { ElementItem, ElementType } from '@/types';
import { toastify } from '@/utils';

import { PropertiesRightbar } from '../PropertiesRightbar';
import { ResponsiveGridLayout } from '../ResponsiveGridLayout';

interface FormContainerProps {
  currentElementType?: ElementType;
  isDisabled: boolean;
  isLoading: boolean;
}

export const FormContainer = ({
  currentElementType,
  isDisabled,
  isLoading,
}: FormContainerProps) => {
  const { setForm, initLogo, currentLogo, setCurrentLogo, setCurrentLogoFile } =
    useBuildFormContext();

  const logoInputRef = useRef<HTMLInputElement>(null);

  const { elements, setElements, edittingItem, setEdittingItem } =
    useElementLayouts();

  const handleClickAddLogo = () => {
    logoInputRef.current?.click();
  };

  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];

    if (!ALLOWED_IMAGE_FILE_TYPES.includes(file.type)) {
      toastify.displayError(MESSAGES.ONLY_SUPPORT_IMAGE_FILE_TYPES);
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Encoded = reader?.result?.toString() ?? '';
      setCurrentLogo(base64Encoded);
      setForm((prevState) => ({
        ...prevState,
        logoUrl: base64Encoded,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
      setCurrentLogoFile(file);
    }
    event.target.value = '';
  };

  const handleClickRemoveLogo = () => {
    setCurrentLogo('');
    setForm((prevState) => ({
      ...prevState,
      logoUrl: '',
    }));
    setCurrentLogoFile(undefined);
  };

  const updateItem = (item: ElementItem) => {
    setElements(
      elements.map((element) => {
        if (element.id !== edittingItem!.id) return element;
        return item;
      }),
    );
  };

  useEffect(() => {
    setForm((prevState) => ({
      ...prevState,
      elements: elements,
    }));
  }, [elements, setForm]);

  const handleConfig = (config: ElementItem['config']) => {
    setEdittingItem({ ...edittingItem, config: config } as ElementItem);
  };

  return (
    <Stack className='min-h-screen items-center py-7'>
      <Stack className='w-[45%] justify-between gap-7'>
        {currentLogo ? (
          <Box pos='relative' className='px-4'>
            <LoadingOverlay
              visible={isLoading}
              zIndex={80}
              overlayProps={{ radius: 'sm', blur: 2 }}
              loaderProps={{ color: 'ocean-green.5', type: 'dots' }}
            />
            <Stack className='gap-2'>
              <Stack className='relative mx-auto'>
                <input
                  type='file'
                  ref={logoInputRef}
                  onChange={(event) => handleLogoChange(event)}
                  accept={ALLOWED_IMAGE_FILE_TYPES.join(',')}
                  className='hidden'
                />
                <Image
                  src={currentLogo}
                  className='max-h-36 max-w-72 cursor-pointer object-contain'
                  onClick={handleClickAddLogo}
                />
                {currentLogo !== initLogo && (
                  <CloseButton
                    radius='lg'
                    size='sm'
                    icon={<IoClose size={14} />}
                    onClick={() => {
                      setCurrentLogo(initLogo);
                      setForm((prevState) => ({
                        ...prevState,
                        logoUrl: initLogo,
                      }));
                      setCurrentLogoFile(undefined);
                    }}
                    className='absolute right-1 top-1 cursor-pointer bg-slate-200 p-0.5 text-slate-600 opacity-90 hover:bg-slate-300'
                  />
                )}
              </Stack>
              {currentLogo === initLogo && (
                <Divider
                  size='sm'
                  label={
                    <Button
                      title='Remove logo'
                      variant='subtle'
                      leftSection={<IoTrash size={14} />}
                      onClick={handleClickRemoveLogo}
                      className='my-2 h-[33px] text-xs font-medium uppercase'
                    />
                  }
                  labelPosition='center'
                  variant='dashed'
                  className='px-4'
                />
              )}
            </Stack>
          </Box>
        ) : (
          <Divider
            size='sm'
            label={
              <>
                <input
                  type='file'
                  ref={logoInputRef}
                  onChange={(event) => handleLogoChange(event)}
                  accept={ALLOWED_IMAGE_FILE_TYPES.join(',')}
                  className='hidden'
                />
                <Button
                  title='Add your logo'
                  variant='subtle'
                  leftSection={<IoIosAdd size={16} />}
                  onClick={handleClickAddLogo}
                  className='my-2 h-[33px] text-xs font-medium uppercase'
                  disabled={isLoading}
                />
              </>
            }
            labelPosition='center'
            variant='dashed'
            className='px-4'
          />
        )}
        <Box pos='relative' className='px-4'>
          <LoadingOverlay
            visible={isLoading}
            zIndex={80}
            overlayProps={{ radius: 'sm', blur: 2, className: 'scale-x-150' }}
            loaderProps={{ color: 'ocean-green.5', type: 'dots' }}
          />
          <ResponsiveGridLayout
            currentElementType={currentElementType!}
            updateItem={updateItem}
            handleConfig={handleConfig}
            isDisabled={isDisabled}
          />
        </Box>
        <PropertiesRightbar
          edittingItem={edittingItem!}
          updateItem={updateItem}
          handleConfig={handleConfig}
        />
      </Stack>
    </Stack>
  );
};
