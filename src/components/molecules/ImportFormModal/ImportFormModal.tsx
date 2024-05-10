import { FaFileImport } from 'react-icons/fa6';
import {
  ModalProps as MantineModalProps,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import {
  defaultDatePickerConfig,
  defaultDropdownConfig,
  defaultDropdownHeightWidth,
  defaultElementHeightWidth,
  defaultFileUploadConfig,
  defaultFileUploadHeightWidth,
  defaultLongTextHeightWidth,
  defaultMultipleChoiceConfig,
  defaultMultipleChoiceHeightWidth,
  defaultScaleRatingConfig,
  defaultScaleRatingHeightWidth,
  defaultShortTextHeightWidth,
  defaultSingleChoiceConfig,
  defaultSingleChoiceHeightWidth,
  defaultTextConfig,
  defaultTimeHeightWidth,
  defaultTimeInputConfig,
  MESSAGES,
} from '@/constants';
import {
  initFormRequestState,
  useBuildFormContext,
  useElementLayouts,
} from '@/contexts';
import { useImportFormMutation } from '@/redux/api/formApi';
import {
  ElementItem,
  ElementType,
  ErrorResponse,
  ImportFormResponse,
} from '@/types';
import { importFormSchema, toastify } from '@/utils';

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

  const convertImportFormResponse = (form: ImportFormResponse) => {
    const convertedElements = form.elements.map((element) => {
      const uid = uuidv4();

      switch (element.type) {
        case ElementType.SHORT_TEXT:
          return {
            id: uid,
            type: element.type,
            gridSize: {
              ...element.gridSize,
              ...defaultShortTextHeightWidth,
            },
            config: { ...defaultTextConfig, ...element.config },
            fields: [
              {
                id: uuidv4(),
                name: 'shortText',
              },
            ],
          };
        case ElementType.LONG_TEXT:
          return {
            id: uid,
            type: element.type,
            gridSize: {
              ...element.gridSize,
              ...defaultLongTextHeightWidth,
            },
            config: { ...defaultTextConfig, ...element.config },
            fields: [
              {
                id: uuidv4(),
                name: 'longText',
              },
            ],
          };
        case ElementType.SINGLE_CHOICE:
          return {
            id: uid,
            type: element.type,
            gridSize: {
              ...element.gridSize,
              ...defaultSingleChoiceHeightWidth,
            },
            config: { ...defaultSingleChoiceConfig, ...element.config },
            fields: [
              {
                id: uuidv4(),
                name: 'singleChoice',
              },
            ],
          };
        case ElementType.MULTIPLE_CHOICE:
          return {
            id: uid,
            type: element.type,
            gridSize: {
              ...element.gridSize,
              ...defaultMultipleChoiceHeightWidth,
            },
            config: { ...defaultMultipleChoiceConfig, ...element.config },
            fields: [
              {
                id: uuidv4(),
                name: 'multipleChoice',
              },
            ],
          };
        case ElementType.DROPDOWN:
          return {
            id: uid,
            type: element.type,
            gridSize: {
              ...element.gridSize,
              ...defaultDropdownHeightWidth,
            },
            config: { ...defaultDropdownConfig, ...element.config },
            fields: [
              {
                id: uuidv4(),
                name: 'dropdown',
              },
            ],
          };
        case ElementType.FILE_UPLOAD:
          return {
            id: uid,
            type: element.type,
            gridSize: {
              ...element.gridSize,
              ...defaultFileUploadHeightWidth,
            },
            config: { ...defaultFileUploadConfig, ...element.config },
            fields: [
              {
                id: uuidv4(),
                name: 'fileUpload',
              },
            ],
          };
        case ElementType.DATEPICKER:
          return {
            id: uid,
            type: element.type,
            gridSize: {
              ...element.gridSize,
              ...defaultElementHeightWidth,
            },
            config: { ...defaultDatePickerConfig, ...element.config },
            fields: [
              {
                id: uuidv4(),
                name: 'datePicker',
              },
            ],
          };
        case ElementType.TIME:
          return {
            id: uid,
            type: element.type,
            gridSize: {
              ...element.gridSize,
              ...defaultTimeHeightWidth,
            },
            config: { ...defaultTimeInputConfig, ...element.config },
            fields: [
              {
                id: uuidv4(),
                name: 'timeInput',
              },
            ],
          };
        case ElementType.SCALE_RATING:
          return {
            id: uid,
            type: element.type,
            gridSize: {
              ...element.gridSize,
              ...defaultScaleRatingHeightWidth,
            },
            config: { ...defaultScaleRatingConfig, ...element.config },
            fields: [
              {
                id: uuidv4(),
                name: 'scaleRating',
              },
            ],
          };
        default:
          break;
      }
    });

    const convertedElementsWithCoordinates = convertedElements.map(
      (currentElement, currentIndex) => {
        let newY = 0;
        convertedElements.forEach((element, index) => {
          if (index >= currentIndex) return;
          else {
            newY += element?.gridSize.h || 0;
          }
        });
        return {
          ...currentElement,
          gridSize: {
            ...currentElement?.gridSize,
            y: newY,
          },
        };
      },
    );

    return { ...form, elements: convertedElementsWithCoordinates };
  };

  const handleImportForm = () => {
    importForm({ formUrl: values.formUrl }).then((res) => {
      if ('data' in res) {
        const convertedForm = convertImportFormResponse(res.data.data);
        setCurrentTitle(convertedForm.title);
        setForm({
          ...initFormRequestState,
          title: convertedForm.title,
          elements: convertedForm.elements as ElementItem[],
        });
        setElements([...(convertedForm.elements as ElementItem[])]);
        toastify.displaySuccess(MESSAGES.IMPORT_FROM_GG_FORMS_SUCCESS);
        handleResetForm();
        onClickCancel();
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
      onClose={() => {
        props.onClose();
        handleResetForm();
      }}
      headerIcon={<FaFileImport className='text-white' />}
      headerTitle='Import form'
      body={
        <Stack className='min-h-[170px] gap-3 px-3 py-8'>
          <Text className='text-base font-semibold'>
            Enter a Google Forms URL
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
      onClickCancel={onClickCancel}
      onClickSubmit={handleSubmit}
      isLoading={isFormImporting}
    />
  );
};
