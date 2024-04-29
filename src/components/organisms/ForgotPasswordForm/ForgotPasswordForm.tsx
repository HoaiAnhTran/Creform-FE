import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { Stack, Text } from '@mantine/core';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';

import { Button } from '@/atoms/Button';
import { PATH } from '@/constants';
import { TextInput } from '@/molecules/TextInput';
import { signUpSchema } from '@/utils/schemas/authSchema';

const forgotPasswordSchema = signUpSchema.pick(['email']);

export type ForgotPasswordSchemaType = yup.InferType<
  typeof forgotPasswordSchema
>;

interface ForgotPasswordFormProps {
  onSubmit: (value: ForgotPasswordSchemaType) => void;
}

export const ForgotPasswordForm = (props: ForgotPasswordFormProps) => {
  const { onSubmit } = props;

  const navigate = useNavigate();

  const initialValues: ForgotPasswordSchemaType = {
    email: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={forgotPasswordSchema}
      validateOnBlur={true}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      <Form className='h-full w-full'>
        <Stack className='justify-between gap-6'>
          <Text className='text-center text-[13px] leading-5'>
            Enter the email address associated with your account and we'll send
            you a token to reset your password.
          </Text>
          <Field
            name='email'
            label='Email'
            placeholder='Enter your email'
            withAsterisk
            classNameError='min-h-0'
            component={TextInput}
          />
          <Button title='Continue' type='submit' />
          <Button
            title='Back to Login'
            leftSection={<IoIosArrowBack size={14} />}
            onClick={() => navigate(PATH.LOGIN_PAGE)}
            className='bg-transparent text-xs font-normal text-burnt-sienna-500 hover:bg-transparent hover:text-burnt-sienna-600'
            classNames={{
              section: 'mr-[4px]',
            }}
          />
        </Stack>
      </Form>
    </Formik>
  );
};
