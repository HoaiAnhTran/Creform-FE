import { useMemo, useState } from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { Tooltip, UnstyledButton } from '@mantine/core';
import { Form, Formik } from 'formik';

import DisabledFormIcon from '@/assets/images/disable-form.png';
import { PATH } from '@/constants';
import { useElementLayouts } from '@/contexts';
import { Loader } from '@/molecules/Loader';
import { ScrollToTopButton } from '@/molecules/ScrollToTopButton';
import { FormRenderComponent } from '@/organisms/FormRenderComponent';
import { SubmissionConfirmation } from '@/organisms/SubmissionConfirmation';
import { useGetFormDetailsQuery } from '@/redux/api/formApi';
import { useCreateResponseMutation } from '@/redux/api/responseApi';
import { ErrorResponse } from '@/types';
import {
  cn,
  getAccessTokenFromLS,
  getFormAnswerFields,
  toastify,
} from '@/utils';

export const PublicPage = () => {
  const { id: formId } = useParams();

  const isAuthenticated = Boolean(getAccessTokenFromLS());

  const { data: formData, isLoading } = useGetFormDetailsQuery(
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
    return createFormResponse({ formId: formId!, payload: formResponse }).then(
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

  const renderBackToHomeButton = () => (
    <Tooltip
      label='Back to Home'
      position='right'
      arrowSize={6}
      withArrow
      offset={8}
      color='gray.8'
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
            'relative flex h-12 w-12 items-center justify-center rounded-full bg-ocean-green-400 hover:bg-ocean-green-500',
            {
              'bg-ocean-green-300 hover:bg-ocean-green-300':
                isLoadingCreateFormResponse,
            },
          )}
        >
          <MdKeyboardBackspace
            size={24}
            className='text-quarter-pearl-lusta-50'
          />
        </span>
      </UnstyledButton>
    </Tooltip>
  );

  if (isLoading) {
    return <Loader type='oval' className='translate-y-[50vh]' />;
  }

  if (formData?.disabled === true || formData?.deletedAt !== null)
    return (
      <div className='text-sl flex min-h-screen items-start justify-center bg-ocean-green-50 py-10'>
        {isAuthenticated && renderBackToHomeButton()}
        <div className='flex h-fit w-[50%] flex-col justify-between gap-3 rounded-xl border-x-0 border-b-0 border-t-[25px] border-solid border-t-ocean-green-500 bg-white px-6 py-8 shadow-lg'>
          <h2 className='text-[32px] text-ocean-green-600'>
            {formData?.title}
          </h2>
          <span className='leading-7'>
            This form is no longer accepting submissions. <br></br> Try
            contacting the owner of the form if you think this is a mistake.
          </span>
          <img
            src={DisabledFormIcon}
            className='mt-5 h-48 w-48 self-center object-contain text-ocean-green-500'
          />
        </div>
      </div>
    );

  return (
    <div className='flex min-h-screen items-center justify-center bg-ocean-green-50 py-10'>
      {isAuthenticated && renderBackToHomeButton()}
      {!isSuccess ? (
        <Formik
          validateOnBlur={true}
          validateOnChange={false}
          initialValues={{}}
          onSubmit={handleCreateFormResponse}
        >
          <Form className='h-full w-full'>
            <FormRenderComponent
              form={formData}
              isLoading={isLoadingCreateFormResponse}
            />
            <ScrollToTopButton className='fixed bottom-14 right-10' />
          </Form>
        </Formik>
      ) : (
        <SubmissionConfirmation />
      )}
    </div>
  );
};
