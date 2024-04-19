import { Link } from 'react-router-dom';
import { Center } from '@mantine/core';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';

import { Button } from '@/atoms/Button';
import { PATH } from '@/constants/route';
import { TextInput } from '@/molecules/TextInput';
import { accountSchema } from '@/utils/schemas/rules';

const signupSchema = accountSchema.pick([
  'email',
  'password',
  'confirmPassword',
  'username',
]);

export type SignupSchema = yup.InferType<typeof signupSchema>;

interface SignupFormProps {
  onSubmit: (value: SignupSchema) => void;
}

export const SignupForm = (props: SignupFormProps) => {
  const { onSubmit } = props;
  const initialValues = {
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
      validationSchema={signupSchema}
      onSubmit={onSubmit}
    >
      <Form className='h-full w-full'>
        <Field name='username' label='Username' component={TextInput} />
        <Field name='email' label='Email' component={TextInput} />
        <Field
          name='password'
          label='Password'
          type='password'
          component={TextInput}
        />
        <Field
          name='confirmPassword'
          label='Confirm Password'
          type='password'
          component={TextInput}
        />

        <Center>
          <Button title='Sign Up' type='submit' className='w-full' />
        </Center>
        <div className='mt-3 flex items-center justify-center text-xs'>
          <span>Already have an account?</span>
          <Link
            to={`/${PATH.LOGIN_PAGE}`}
            className='ml-1 text-malachite-500  no-underline hover:font-medium hover:text-malachite-600'
          >
            Login
          </Link>
        </div>
      </Form>
    </Formik>
  );
};
