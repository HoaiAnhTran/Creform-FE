import { Link } from 'react-router-dom';
import { Center } from '@mantine/core';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';

import { Button } from '@/atoms/Button';
import { PATH } from '@/constants/route';
import { TextInput } from '@/molecules/TextInput';
import { accountSchema } from '@/utils/schemas/rules';

const loginSchema = accountSchema.pick(['email', 'password']);

export type LoginSchema = yup.InferType<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (value: LoginSchema) => void;
}

export const LoginForm = (props: LoginFormProps) => {
  const { onSubmit } = props;
  const initialValues = {
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
        <Field name='email' label='Email' component={TextInput} />

        <Field
          name='password'
          type='password'
          label='Password'
          component={TextInput}
        />

        <Center>
          <Button title='Login' type='submit' className='w-full' />
        </Center>
        <div className='mt-3 flex items-center justify-center text-xs'>
          <span>Don't have an account?</span>
          <Link
            to={`/${PATH.SIGNUP_PAGE}`}
            className='ml-1 text-malachite-500 no-underline hover:font-medium hover:text-malachite-600'
          >
            Sign Up
          </Link>
        </div>
      </Form>
    </Formik>
  );
};
