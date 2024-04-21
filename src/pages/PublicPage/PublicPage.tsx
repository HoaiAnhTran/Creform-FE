import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, LoadingOverlay } from '@mantine/core';
import { Form, Formik } from 'formik';

import { useElementLayouts } from '@/contexts';
import { FormRenderComponent } from '@/organisms/FormRenderComponent';
import { SubmissionConfirmation } from '@/organisms/SubmissionConfirmation';
import { useGetFormDetailsQuery } from '@/redux/api/formApi';
import { useCreateResponseMutation } from '@/redux/api/responseApi';
import { ErrorResponse } from '@/types';
import { toastify } from '@/utils';
import { getFormAnswerFields } from '@/utils/seperates';

export const PublicPage = () => {
  const { id: formId } = useParams();
  const { data } = useGetFormDetailsQuery(
    { id: formId || '' },
    { skip: !formId },
  );
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { elements, canSubmit } = useElementLayouts();
  const [createFormResponse, { isLoading: isLoadingCreateFormResponse }] =
    useCreateResponseMutation();

  const formResponse = useMemo(() => getFormAnswerFields(elements), [elements]);

  const handleCreateFormResponse = () => {
    if (!formResponse || !canSubmit) return;
    return createFormResponse({ formId: +formId!, payload: formResponse }).then(
      (res) => {
        if ('data' in res) {
          toastify.displaySuccess(res.data.message as string);
          setIsSuccess(true);
          return;
        }
        setIsSuccess(false);
        return toastify.displayError(
          (res.error as ErrorResponse).message as string,
        );
      },
    );
  };

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
          <Formik initialValues={{}} onSubmit={handleCreateFormResponse}>
            <Form className='h-full w-full'>
              <Box pos='relative'>
                <LoadingOverlay
                  visible={isLoadingCreateFormResponse}
                  zIndex={1000}
                  overlayProps={{ radius: 'sm', blur: 2 }}
                  loaderProps={{ color: 'green' }}
                />

                <FormRenderComponent form={data} />
              </Box>
            </Form>
          </Formik>
        ) : (
          <SubmissionConfirmation />
        )}
      </div>
    </Box>
  );
};
