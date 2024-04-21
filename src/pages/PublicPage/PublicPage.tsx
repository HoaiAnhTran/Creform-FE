import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, LoadingOverlay } from '@mantine/core';
import { Form, Formik } from 'formik';

import { ElementLayoutProvider } from '@/contexts';
import { FormRenderComponent } from '@/organisms/FormRenderComponent';
import { SubmissionConfirmation } from '@/organisms/SubmissionConfirmation';
import { useGetFormDetailsQuery } from '@/redux/api/formApi';

export const PublicPage = () => {
  const { id: formId } = useParams();
  const { data } = useGetFormDetailsQuery(
    { id: formId || '' },
    { skip: !formId },
  );
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  return (
    <Box pos='relative'>
      <LoadingOverlay
        visible={!data}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'green' }}
      />
      <div className='flex min-h-screen items-center justify-center bg-malachite-50'>
        {!isSuccess ? (
          <Formik initialValues={{}} onSubmit={() => {}}>
            <Form className='h-full w-full'>
              <ElementLayoutProvider>
                <FormRenderComponent form={data} setIsSuccess={setIsSuccess} />
              </ElementLayoutProvider>
            </Form>
          </Formik>
        ) : (
          <SubmissionConfirmation />
        )}
      </div>
    </Box>
  );
};
