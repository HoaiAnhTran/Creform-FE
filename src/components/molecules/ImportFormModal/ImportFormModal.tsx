import { FaFileImport } from 'react-icons/fa6';
import {
  ModalProps as MantineModalProps,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useFormik } from 'formik';

import { MESSAGES } from '@/constants';
import { useBuildFormContext, useElementLayouts } from '@/contexts';
import { useImportFormMutation } from '@/redux/api/formApi';
import { ElementItem, ErrorResponse } from '@/types';
import { convertImportFormResponse, importFormSchema, toastify } from '@/utils';

import { Modal } from '../Modal';

enum IMPORT_FORM_FIELD {
  FORM_URL = 'formUrl',
}

interface ImportFormModalProps extends MantineModalProps {
  onClickCancel: () => void;
}

export const ImportFormModal = ({
  onClickCancel,
  ...props
}: ImportFormModalProps) => {
  const { setForm, setCurrentTitle } = useBuildFormContext();

  const { setElements } = useElementLayouts();

  const [importForm, { isLoading: isFormImporting }] = useImportFormMutation();

  const handleImportForm = () => {
    importForm({ formUrl: values.formUrl }).then((res) => {
      if ('data' in res) {
        const convertedForm = convertImportFormResponse(res.data.data);
        setCurrentTitle(convertedForm.title);
        setForm((prevState) => ({
          ...prevState,
          title: convertedForm.title,
          elements: convertedForm.elements as ElementItem[],
        }));
        setElements([...(convertedForm.elements as ElementItem[])]);
        toastify.displaySuccess(MESSAGES.IMPORT_FROM_GG_FORMS_SUCCESS);
        handleCloseModal();
        return;
      }
      if (res.error as ErrorResponse)
        toastify.displayError(MESSAGES.IMPORT_FROM_GG_FORMS_FAILED);
    });
  };

  const handleResetForm = () => {
    setFieldValue(IMPORT_FORM_FIELD.FORM_URL, '');
    setFieldError(IMPORT_FORM_FIELD.FORM_URL, '');
    setFieldTouched(IMPORT_FORM_FIELD.FORM_URL, false);
  };

  const handleCloseModal = () => {
    handleResetForm();
    onClickCancel();
  };

  const {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    getFieldProps,
    handleSubmit,
  } = useFormik({
    initialValues: { formUrl: '' },
    validationSchema: importFormSchema,
    onSubmit: handleImportForm,
  });

  return (
    <Modal
      {...props}
      onClose={handleCloseModal}
      headerIcon={<FaFileImport className='text-white' />}
      headerTitle='Import form'
      body={
        <Stack className='min-h-[170px] gap-3 px-3 py-8'>
          <Text className='text-base font-semibold'>
            Enter a public Google Forms URL
          </Text>
          <TextInput
            placeholder='https://docs.google.com/forms/d/FORM_ID/edit'
            {...getFieldProps(IMPORT_FORM_FIELD.FORM_URL)}
          />
          {errors.formUrl && touched.formUrl && (
            <Text className='text-xs text-red-500'>{errors.formUrl}</Text>
          )}
        </Stack>
      }
      canSubmit={values.formUrl !== ''}
      onClickCancel={handleCloseModal}
      onClickSubmit={handleSubmit}
      isLoading={isFormImporting}
    />
  );
};
