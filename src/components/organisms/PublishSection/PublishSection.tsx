import { useState } from 'react';
import { FaLink } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';
import {
  Box,
  CopyButton,
  Group,
  Stack,
  Switch,
  TextInput,
} from '@mantine/core';

import { Button } from '@/atoms/Button';
import { MESSAGES } from '@/constants';
import { useBuildFormContext } from '@/contexts';
import { useUpdateDisabledStatusMutation } from '@/redux/api/formApi';
import { toastify } from '@/utils';

export const PublishSection = () => {
  const { form, isEditForm } = useBuildFormContext();

  const link = isEditForm ? `${window.location.origin}/form/${form.id}` : '';
  const [updateDisabledStatus] = useUpdateDisabledStatusMutation();
  const [disabled, setDisabled] = useState(form.disabled);

  return (
    <Box className='flex h-screen w-full items-center justify-center bg-malachite-50'>
      <Stack className='w-[660px] -translate-y-[30%]'>
        <Group>
          <Box className='flex h-10 w-10 items-center justify-center rounded bg-malachite-400'>
            <FaLink size={20} className='text-white' />
          </Box>
          <Stack className='gap-0'>
            <span className='text-base font-semibold text-blue-200'>
              DIRECT LINK OF YOUR FORM
            </span>
            <span className='text-sm text-blue-100'>
              Your form is securely published and ready to use at this address.
            </span>
          </Stack>
        </Group>
        <Stack className='mt-4 gap-8 rounded border border-solid border-blue-50 bg-white px-6 py-8'>
          <span className='text-base font-semibold text-blue-200'>
            SHARE WITH LINK
          </span>
          <TextInput
            leftSection={<FiLink size={16} />}
            value={link}
            variant='filled'
            readOnly
            classNames={{
              input: 'h-10 focus:border-none',
            }}
            onClick={(e) => e.currentTarget.select()}
          />
          <Group className='justify-end'>
            <CopyButton value={link}>
              {({ copied, copy }) => (
                <Button
                  onClick={copy}
                  title={copied ? 'Copied to clipboard!' : 'COPY LINK'}
                  disabled={!isEditForm}
                />
              )}
            </CopyButton>
            <Button
              className='bg-blueButton hover:bg-blueButton'
              title='OPEN IN NEW TAB'
              onClick={() => {
                window.open(link, '_blank');
              }}
              disabled={!isEditForm}
            />
          </Group>
          <Stack className='gap-2'>
            <span className='text-base font-semibold uppercase text-blue-200'>
              Do you want to publish this form ?
            </span>
            <Switch
              size='xl'
              onLabel='ON'
              offLabel='OFF'
              checked={!disabled}
              onChange={(event) => {
                if (!form?.id) return;
                updateDisabledStatus({
                  formId: form.id,
                  disabled: !event.target.checked,
                }).catch(() => {
                  toastify.displayError(MESSAGES.UPDATE_PUBLISH_STATUS_ERROR);
                  setDisabled(!disabled);
                });
                setDisabled(!event.target.checked);
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
