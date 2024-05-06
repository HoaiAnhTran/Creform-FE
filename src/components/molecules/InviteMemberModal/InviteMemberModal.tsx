import { IoPersonAdd } from 'react-icons/io5';
import {
  ModalProps as MantineModalProps,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useFormik } from 'formik';

import { useCreateInvitationMutation } from '@/redux/api/invitationApi';
import { ErrorResponse } from '@/types';
import { signUpSchema, toastify } from '@/utils';

import { Modal } from '../Modal';

enum INVITE_MEMBER_FORM_FIELD {
  EMAIL = 'email',
}

interface InviteMemberModalProps extends MantineModalProps {
  teamId: number;
  onClickCancel: () => void;
}

export const InviteMemberModal = ({
  teamId,
  onClickCancel,
  ...props
}: InviteMemberModalProps) => {
  const [createInvitation, { isLoading: isSendingInvitation }] =
    useCreateInvitationMutation();

  const handleInviteMember = (value: { email: string }) => {
    createInvitation({ teamId: teamId, email: value.email }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        handleResetForm();
        onClickCancel();
        return;
      }
      if (res.error as ErrorResponse)
        toastify.displayError((res.error as ErrorResponse).message as string);
    });
  };

  const handleResetForm = () => {
    setFieldValue(INVITE_MEMBER_FORM_FIELD.EMAIL, '');
    setFieldError(INVITE_MEMBER_FORM_FIELD.EMAIL, '');
    setFieldTouched(INVITE_MEMBER_FORM_FIELD.EMAIL, false);
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
    initialValues: { email: '' },
    validationSchema: signUpSchema.pick([INVITE_MEMBER_FORM_FIELD.EMAIL]),
    onSubmit: handleInviteMember,
  });

  return (
    <Modal
      {...props}
      onClose={() => {
        props.onClose();
        handleResetForm();
      }}
      headerIcon={<IoPersonAdd className='text-white' />}
      headerTitle='Invite Member'
      body={
        <Stack className='min-h-[170px] gap-3 px-3 py-8'>
          <Text className='text-base font-semibold'>
            Enter an email address
          </Text>
          <TextInput
            placeholder='example@gmail.com'
            {...getFieldProps(INVITE_MEMBER_FORM_FIELD.EMAIL)}
          />
          {errors.email && touched.email && (
            <Text className='text-xs text-red-500'>{errors.email}</Text>
          )}
        </Stack>
      }
      onClickCancel={onClickCancel}
      onClickSubmit={handleSubmit}
      submitButtonProps={{
        title: 'Send Invitation',
        disabled: !values.email,
      }}
      isLoading={isSendingInvitation}
    />
  );
};
