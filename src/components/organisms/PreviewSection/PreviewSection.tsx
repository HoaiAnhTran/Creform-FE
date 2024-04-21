import { useEffect } from 'react';
import { Box, Stack } from '@mantine/core';
import { Form, Formik } from 'formik';

import { useBuildFormContext } from '@/contexts';

import { FormRenderComponent } from '../FormRenderComponent';
import { SubmissionConfirmation } from '../SubmissionConfirmation';

export const PreviewSection = () => {
  const { form, clickedSubmit, setClickedSubmit } = useBuildFormContext();

  useEffect(
    () => () => {
      setClickedSubmit(false);
    },
    [setClickedSubmit],
  );

  return (
    <Stack className='relative flex h-screen w-full items-center justify-center overflow-y-scroll bg-quarter-pearl-lusta-50'>
      {clickedSubmit ? (
        <Box className='scale-90'>
          <SubmissionConfirmation />
        </Box>
      ) : (
        <Box className='absolute top-[50px] w-full py-7'>
          <Formik
            validateOnBlur={true}
            validateOnChange={false}
            initialValues={{}}
            onSubmit={() => {}}
          >
            <Form>
              <FormRenderComponent form={form} />
            </Form>
          </Formik>
        </Box>
      )}
    </Stack>
  );
};
