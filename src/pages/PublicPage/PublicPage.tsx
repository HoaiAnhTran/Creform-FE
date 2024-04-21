import { useMemo, useState } from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Tooltip, UnstyledButton } from '@mantine/core';
import { Form, Formik } from 'formik';

import { PATH } from '@/constants';
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
  const navigate = useNavigate();
  const { elements } = useElementLayouts();
  const [createFormResponse, { isLoading: isLoadingCreateFormResponse }] =
    useCreateResponseMutation();

  const formResponse = useMemo(() => getFormAnswerFields(elements), [elements]);

  const handleCreateFormResponse = () => {
    if (!formResponse) return;
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
    <div className='flex min-h-screen items-center justify-center bg-malachite-50'>
      {!isSuccess ? (
        <Formik
          validateOnBlur={true}
          validateOnChange={false}
          initialValues={{}}
          onSubmit={handleCreateFormResponse}
        >
          <Form className='h-full w-full'>
            <FormRenderComponent
              form={data}
              isLoading={isLoadingCreateFormResponse}
            />
          </Form>
        </Formik>
      ) : (
        <Box>
          <Tooltip
            label='Back to home'
            position='right'
            arrowSize={6}
            withArrow
            offset={8}
          >
            <UnstyledButton
              className='fixed left-10 top-10'
              onClick={() => {
                navigate(PATH.OVERVIEW_PAGE);
              }}
            >
              <span className='relative flex h-12 w-12 items-center justify-center rounded-full bg-malachite-400 hover:bg-malachite-500'>
                <MdKeyboardBackspace size={24} className='text-white' />
              </span>
            </UnstyledButton>
          </Tooltip>
          <SubmissionConfirmation />
        </Box>
      )}
    </div>
  );
};
