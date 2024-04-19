import { ChangeEvent, useRef, useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import {
  CloseButton,
  Divider,
  Group,
  Image,
  Paper,
  Stack,
} from '@mantine/core';

import { Button } from '@/atoms/Button';

export const FormContainer = () => {
  // TODO: remove after getting data from API
  const logoUrl = '';

  const [currentLogo, setCurrentLogo] = useState<string>(logoUrl);

  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleClickAddLogo = () => {
    logoInputRef.current?.click();
  };

  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Encoded = reader?.result?.toString() ?? '';
      setCurrentLogo(base64Encoded);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <Stack className='h-full w-full items-center bg-inherit'>
      <Stack className='my-8 w-[55%] justify-between gap-6'>
        {currentLogo ? (
          <Group className='relative mx-auto'>
            <input
              type='file'
              ref={logoInputRef}
              onChange={(event) => handleLogoChange(event)}
              accept='image/*'
              className='hidden'
            />
            <Image
              src={currentLogo}
              className='h-36 w-72 flex-1 cursor-pointer object-cover'
              onClick={handleClickAddLogo}
            />
            {currentLogo !== logoUrl && (
              <CloseButton
                radius='lg'
                size='sm'
                icon={<IoClose size={14} />}
                onClick={() => setCurrentLogo(logoUrl || '')}
                className='absolute right-1 top-1 cursor-pointer bg-slate-200 p-0.5 text-slate-600 opacity-90 hover:bg-slate-300'
              />
            )}
          </Group>
        ) : (
          <Divider
            size='sm'
            label={
              <>
                <input
                  type='file'
                  ref={logoInputRef}
                  onChange={(event) => handleLogoChange(event)}
                  accept='image/*'
                  className='hidden'
                />
                <Button
                  title='Add your logo'
                  variant='subtle'
                  color='gray'
                  leftSection={<IoIosAdd size={16} />}
                  onClick={handleClickAddLogo}
                  className='my-2 text-xs font-medium uppercase'
                />
              </>
            }
            labelPosition='center'
            variant='dashed'
          />
        )}
        <Paper withBorder className='min-h-screen rounded-md bg-white p-7'>
          Form container
        </Paper>
      </Stack>
    </Stack>
  );
};
