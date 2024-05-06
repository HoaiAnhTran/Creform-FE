import { Link } from 'react-router-dom';
import { Stack } from '@mantine/core';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';

import { Button } from '@/atoms/Button';
import { PATH } from '@/constants/routes';
import { PasswordInput } from '@/molecules/PasswordInput';
import { TextInput } from '@/molecules/TextInput';
import { signUpSchema } from '@/utils';

const loginSchema = signUpSchema.pick(['email', 'password']);

export type LoginSchemaType = yup.InferType<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (value: LoginSchemaType) => void;
}

export const LoginForm = (props: LoginFormProps) => {
  const { onSubmit } = props;

  const initialValues: LoginSchemaType = {
    email: '',
    password: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      validateOnBlur={true}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      <Form className='h-full w-full'>
        <Stack className='justify-between gap-4'>
          <Field
            name='email'
            label='Email'
            classNameError='min-h-0'
            component={TextInput}
          />
          <Field
            name='password'
            label='Password'
            classNameError='min-h-0'
            component={PasswordInput}
          />
          <Link
            to={PATH.FORGOT_PASSWORD_PAGE}
            className='self-end text-xs text-burnt-sienna-500 no-underline hover:text-burnt-sienna-600'
          >
            Forgot password?
          </Link>

          <Button title='Login' type='submit' />

          <div className='flex items-center justify-center text-xs'>
            <span>Don't have an account?</span>
            <Link
              to={PATH.SIGNUP_PAGE}
              className='ml-1 text-burnt-sienna-500 no-underline hover:text-burnt-sienna-600'
            >
              Sign Up
            </Link>
          </div>
        </Stack>
      </Form>
    </Formik>
  );
};
