import { useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';

import { ElementLayoutProvider } from '@/contexts';
import { FormRenderComponent } from '@/organisms/FormRenderComponent';
import { useGetFormDetailsQuery } from '@/redux/api/formApi';

export const PublicPage = () => {
  const { id: formId } = useParams();
  const { data } = useGetFormDetailsQuery(
    { id: formId || '' },
    { skip: !formId },
  );

  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form className='h-full w-full'>
        <ElementLayoutProvider>
          <FormRenderComponent form={data} />
        </ElementLayoutProvider>
      </Form>
    </Formik>
  );
};
