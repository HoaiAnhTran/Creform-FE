import { Link } from 'react-router-dom';
import { Stack, Text } from '@mantine/core';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';

import { Button } from '@/atoms/Button';
import { PATH } from '@/constants';
import { PasswordInput } from '@/molecules/PasswordInput';
import { resetPasswordSchema } from '@/utils';

export type ResetPasswordSchemaType = yup.InferType<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  onSubmit: (value: ResetPasswordSchemaType) => void;
}

export const ResetPasswordForm = (props: ResetPasswordFormProps) => {
  const { onSubmit } = props;

  const initialValues: ResetPasswordSchemaType = {
    passwordResetToken: '',
    newPassword: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={resetPasswordSchema}
      validateOnBlur={true}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      <Form className='h-full w-full'>
        <Stack className='justify-between gap-5'>
          <Text className='text-center text-[13px] leading-5'>
            Check your email and enter the password reset token.
          </Text>
          <Field
            name='passwordResetToken'
            label='Token'
            placeholder='Enter your password reset token'
            withAsterisk
            classNameError='min-h-0'
            component={PasswordInput}
          />
          <Field
            name='newPassword'
            label='New Password'
            placeholder='Enter your new password'
            withAsterisk
            classNameError='min-h-0'
            component={PasswordInput}
          />
          <Button title='Confirm' type='submit' />
          <div className='flex items-center justify-center text-xs'>
            <span>Didn't receive a token?</span>
            <Link
              to={PATH.FORGOT_PASSWORD_PAGE}
              className='ml-1 text-burnt-sienna-500 no-underline hover:text-burnt-sienna-600'
            >
              Try Again
            </Link>
          </div>
        </Stack>
      </Form>
    </Formik>
  );
};
