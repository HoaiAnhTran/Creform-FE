import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';

import { useGetFormDetailsQuery } from '@/redux/api/formApi';
import { FormRequest } from '@/types';

interface BuildFormContextType {
  form: FormRequest;
  setForm: React.Dispatch<React.SetStateAction<FormRequest>>;
  toggledLeftbar: boolean;
  setToggledLeftbar: React.Dispatch<React.SetStateAction<boolean>>;
  toggledRightbar: boolean;
  setToggledRightbar: React.Dispatch<React.SetStateAction<boolean>>;
  isEditForm: boolean;
}

const initFormRequestState: FormRequest = {
  title: '',
  logoUrl: '',
  settings: {},
  elements: [],
  updatedAt: '',
  createdAt: '',
};

const BuildFormContext = createContext<BuildFormContextType>({
  form: initFormRequestState,
  setForm: () => {},
  toggledLeftbar: false,
  setToggledLeftbar: () => {},
  toggledRightbar: false,
  setToggledRightbar: () => {},
  isEditForm: false,
});

export const BuildFormContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { id: formId } = useParams();

  const isEditForm = Boolean(formId);

  const [form, setForm] = useState<FormRequest>(initFormRequestState);

  const [toggledLeftbar, setToggledLeftbar] = useState<boolean>(false);

  const [toggledRightbar, setToggledRightbar] = useState<boolean>(false);

  const { data } = useGetFormDetailsQuery(
    { id: formId || '' },
    { skip: !formId },
  );

  useEffect(() => {
    if (!data) return;
    setForm((prev) => ({ ...prev, ...data }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <BuildFormContext.Provider
      value={{
        form,
        setForm,
        toggledLeftbar,
        setToggledLeftbar,
        toggledRightbar,
        setToggledRightbar,
        isEditForm,
      }}
    >
      {children}
    </BuildFormContext.Provider>
  );
};

export const useBuildFormContext = () => useContext(BuildFormContext);
