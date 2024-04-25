import { useMemo, useState } from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { Tooltip, UnstyledButton } from '@mantine/core';
import { Form, Formik } from 'formik';

import { PATH } from '@/constants';
import { useElementLayouts } from '@/contexts';
import { FormRenderComponent } from '@/organisms/FormRenderComponent';
import { SubmissionConfirmation } from '@/organisms/SubmissionConfirmation';
import { useGetFormDetailsQuery } from '@/redux/api/formApi';
import { useCreateResponseMutation } from '@/redux/api/responseApi';
import { ErrorResponse } from '@/types';
import { cn, getAccessTokenFromLS, toastify } from '@/utils';
import { getFormAnswerFields } from '@/utils/seperates';

export const PublicPage = () => {
  const { id: formId } = useParams();
  const isAuthenticated = Boolean(getAccessTokenFromLS());
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

  if (data?.disabled)
    return (
      <div className='flex min-h-screen items-start justify-center bg-malachite-50 py-10'>
        <div className='mt-20 flex h-40 w-[45%] flex-col rounded-md border border-solid border-slate-200 bg-white p-7 shadow-lg'>
          <h1>Untitled Form</h1>
          <div>The form Untitled form is no longer accepting responses.</div>
          <div>
            Try contacting the owner of the form if you think this is a mistake
          </div>
        </div>
      </div>
    );
  return (
    <div className='flex min-h-screen items-center justify-center bg-malachite-50 py-10'>
      {isAuthenticated && (
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
            disabled={isLoadingCreateFormResponse}
          >
            <span
              className={cn(
                'relative flex h-12 w-12 items-center justify-center rounded-full bg-malachite-400 hover:bg-malachite-500',
                {
                  'bg-malachite-300 hover:bg-malachite-300':
                    isLoadingCreateFormResponse,
                },
              )}
            >
              <MdKeyboardBackspace size={24} className='text-white' />
            </span>
          </UnstyledButton>
        </Tooltip>
      )}
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
        <SubmissionConfirmation />
      )}
    </div>
  );
};
