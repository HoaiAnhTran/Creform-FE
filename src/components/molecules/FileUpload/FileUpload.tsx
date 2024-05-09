import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { FaFileCircleCheck } from 'react-icons/fa6';
import { IoCloseOutline, IoCloudUpload } from 'react-icons/io5';
import { ActionIcon, Box, Group, Progress, Text } from '@mantine/core';
import {
  ErrorMessage,
  FieldInputProps,
  FieldMetaProps,
  FormikErrors,
} from 'formik';

import { ALLOWED_DOCUMENT_FILE_TYPES, MESSAGES } from '@/constants';
import { useUploadDocumentMutation } from '@/redux/api/uploadApi';
import { ErrorResponse } from '@/types';
import { cn, toastify } from '@/utils';

interface FileUploadProps {
  handleChange?: (
    elementId: string,
    elementFieldId: string,
    value: string,
  ) => void;
  classNameError?: string;
  classNameWrapper?: string;
  elementFieldId?: string;
  elementId?: string;
  field: FieldInputProps<string>;
  form: {
    setFieldValue: (
      field: string,
      value: unknown,
      shouldValidate?: boolean,
    ) => Promise<void | FormikErrors<unknown>>;
  };
  meta: FieldMetaProps<string>;
  classNameLabel?: string;
  readOnly: boolean;
}

export const FileUpload = (props: FileUploadProps) => {
  const {
    handleChange,
    field,
    elementFieldId,
    elementId,
    classNameWrapper,
    form: { setFieldValue },
    classNameError,
    readOnly,
  } = props;

  useEffect(() => {
    setFieldValue(field.name, null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [uploadedFile, setUploadedFile] = useState<File>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadDocument, { isLoading: isUploadingDocument }] =
    useUploadDocumentMutation();

  const handleClickUploadFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files[0];

    if (!ALLOWED_DOCUMENT_FILE_TYPES.includes(file.type)) {
      toastify.displayError(MESSAGES.ONLY_SUPPORT_DOCUMENT_FILE_TYPES);
      event.target.value = ''; // Allow to select the same file again
      return;
    }

    uploadDocument(file).then((res) => {
      if ('data' in res) {
        if (elementFieldId && elementId) {
          handleChange?.(elementId, elementFieldId, res.data.data.url);
          setFieldValue(field.name, res.data.data.url);
        }
        field.onChange(res.data.data.url);
        setUploadedFile(file);
        event.target.value = '';
        return;
      }
      if (res.error as ErrorResponse) {
        toastify.displayError((res.error as ErrorResponse).message);
      }
    });
  };

  const uploadedFileSize: string = useMemo(() => {
    if (!uploadedFile) return '';

    if (uploadedFile.size < 1024) {
      return `${uploadedFile.size} Bytes`;
    }
    if (uploadedFile.size > 1048576) {
      return `${Math.ceil(uploadedFile.size / 1048576)} MB`;
    }
    return `${Math.ceil(uploadedFile.size / 1024)} KB`;
  }, [uploadedFile]);

  const handleClearUploadedFile = () => {
    setUploadedFile(undefined);
    setFieldValue(field.name, null);
  };

  return (
    <div className={cn('flex w-full flex-col', classNameWrapper)}>
      <input
        type='file'
        ref={fileInputRef}
        onChange={(event) => handleFileChange(event)}
        accept={ALLOWED_DOCUMENT_FILE_TYPES.join(',')}
        className='hidden'
      />

      {uploadedFile ? (
        <Group className='h-16 flex-nowrap items-center justify-between gap-3 rounded-lg bg-ocean-green-50 px-4 py-3'>
          <FaFileCircleCheck size={26} className='text-ocean-green-500' />
          <div className='flex flex-col items-start justify-between gap-0.5'>
            <Text className='w-[100px] truncate text-[15px] font-semibold text-ocean-green-500'>
              {uploadedFile.name}
            </Text>
            <Text className='text-xs text-slate-400'>{uploadedFileSize}</Text>
          </div>
          <Progress color='ocean-green.5' value={100} className='w-[300px]' />
          <ActionIcon
            variant='transparent'
            onClick={handleClearUploadedFile}
            className='text-slate-400 hover:text-slate-500'
          >
            <IoCloseOutline size={19} />
          </ActionIcon>
        </Group>
      ) : (
        <Box
          className={cn(
            'flex min-h-16 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-500 bg-slate-100 p-4',
            {
              'cursor-pointer': !readOnly,
            },
          )}
          component='button'
          type='button'
          disabled={readOnly}
          onClick={handleClickUploadFile}
        >
          {isUploadingDocument ? (
            <div className='flex flex-col items-center justify-center gap-2'>
              <Text className='text-sm text-slate-600'>Uploading...</Text>
              <Progress
                color='ocean-green.5'
                value={100}
                animated
                className='w-[300px]'
              />
            </div>
          ) : (
            <>
              <IoCloudUpload size={36} className='text-slate-500' />
              <Text className='text-sm font-medium text-slate-600'>
                Click here to upload a file
              </Text>
              <Text className='text-xs text-slate-400'>
                Supported formats: .pdf, .doc, .docx
              </Text>
              <Text className='text-xs text-slate-400'>
                Maximum file size: 10 MB
              </Text>
            </>
          )}
        </Box>
      )}

      <ErrorMessage
        name={field.name}
        render={(msg) => (
          <div className={cn('mt-3 text-xs text-red-600', classNameError)}>
            {msg}
          </div>
        )}
      />
    </div>
  );
};
