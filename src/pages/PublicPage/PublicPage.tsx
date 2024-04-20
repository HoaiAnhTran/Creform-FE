import { useParams } from 'react-router-dom';

import { FormRenderComponent } from '@/organisms/FormRenderComponent';
import { useGetFormDetailsQuery } from '@/redux/api/formApi';

export const PublicPage = () => {
  const { id: formId } = useParams();
  const { data } = useGetFormDetailsQuery(
    { id: formId || '' },
    { skip: !formId },
  );

  return (
    <div>
      <FormRenderComponent form={data} />
    </div>
  );
};
