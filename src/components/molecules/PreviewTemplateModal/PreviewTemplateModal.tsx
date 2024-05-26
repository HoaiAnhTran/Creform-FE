import { useMemo, useState } from 'react';
import { Box, ModalProps as MantineModalProps } from '@mantine/core';
import { Form, Formik } from 'formik';

import { SubmissionConfirmation } from '@/organisms/SubmissionConfirmation';
import { TemplateRenderComponent } from '@/organisms/TemplateRenderComponent';
import { useGetTemplateDetailsQuery } from '@/redux/api/templateApi';

import { Modal } from '../Modal';

interface PreviewTemplateModalProps extends MantineModalProps {
  templateId: string;
}

export const PreviewTemplateModal = ({
  templateId,
  ...props
}: PreviewTemplateModalProps) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { data: template, isFetching: isFetchingTemplate } =
    useGetTemplateDetailsQuery(
      {
        id: templateId || '',
      },
      { skip: !templateId },
    );

  const modalBody = useMemo(() => {
    if (isSuccess) {
      return (
        <Box className='scale-75'>
          <SubmissionConfirmation />
        </Box>
      );
    }

    if (isFetchingTemplate || !template) return <></>;

    return (
      <Formik
        validateOnBlur={true}
        validateOnChange={false}
        initialValues={{}}
        onSubmit={(values) => {
          setIsSuccess(!!values);
        }}
      >
        <Form className='w-full'>
          <TemplateRenderComponent template={template} />
        </Form>
      </Formik>
    );
  }, [isFetchingTemplate, isSuccess, template]);

  const handleCloseModal = () => {
    props.onClose();
    setIsSuccess(false);
  };

  return (
    <Modal
      {...props}
      onClose={handleCloseModal}
      headerTitle={(!isFetchingTemplate && template?.name) || ''}
      body={
        <Box className='flex flex-col items-center bg-slate-100 p-8'>
          {modalBody}
        </Box>
      }
      headerTitleClassName='text-2xl normal-case'
      hasFooter={false}
      isLoading={isFetchingTemplate}
    />
  );
};
