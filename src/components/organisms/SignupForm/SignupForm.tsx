import { Link } from 'react-router-dom';
import { Stack } from '@mantine/core';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';

import { Button } from '@/atoms/Button';
import { PATH } from '@/constants/routes';
import { PasswordInput } from '@/molecules/PasswordInput';
import { TextInput } from '@/molecules/TextInput';
import { signUpSchema } from '@/utils/schemas/authSchema';

export type SignupSchemaType = yup.InferType<typeof signUpSchema>;

interface SignupFormProps {
  onSubmit: (value: SignupSchemaType) => void;
}

export const SignupForm = (props: SignupFormProps) => {
  const { onSubmit } = props;

  const initialValues: SignupSchemaType = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur={true}
      validateOnChange={false}
      validationSchema={signUpSchema}
      onSubmit={onSubmit}
    >
      <Form className='h-full w-full'>
        <Stack className='justify-between gap-3'>
          <Field
            name='username'
            label='Username'
            size='xs'
            component={TextInput}
          />
          <Field name='email' label='Email' size='xs' component={TextInput} />
          <Field
            name='password'
            label='Password'
            type='password'
            size='xs'
            component={PasswordInput}
          />
          <Field
            name='confirmPassword'
            label='Confirm Password'
            type='password'
            size='xs'
            component={PasswordInput}
          />

          <Button title='Sign Up' type='submit' />

          <div className='flex items-center justify-center text-xs'>
            <span>Already have an account?</span>
            <Link
              to={PATH.LOGIN_PAGE}
              className='ml-1 text-burnt-sienna-500 no-underline hover:text-burnt-sienna-600'
            >
              Login
            </Link>
          </div>
        </Stack>
      </Form>
    </Formik>
  );
};
