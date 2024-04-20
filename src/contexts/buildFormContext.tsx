import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';

import { useGetFormDetailsQuery } from '@/redux/api/formApi';
import { FormResponse } from '@/types';

interface BuildFormContextType {
  form: FormResponse;
  setForm: React.Dispatch<React.SetStateAction<FormResponse>>;
  toggledLeftbar: boolean;
  setToggledLeftbar: React.Dispatch<React.SetStateAction<boolean>>;
  isEditForm: boolean;
}

const initialFormState = {
  id: 0,
  title: '',
  logoUrl: '',
  settings: {},
  totalSubmissions: 0,
  elements: {},
  permissions: {},
  createdAt: '',
  updatedAt: '',
  deletedAt: '',
  creatorId: 0,
  teamId: 0,
};

const BuildFormContext = createContext<BuildFormContextType>({
  form: initialFormState,
  setForm: () => {},
  toggledLeftbar: false,
  setToggledLeftbar: () => {},
  isEditForm: false,
});

export const BuildFormContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { id: formId } = useParams();

  const isEditForm = Boolean(formId);

  const [form, setForm] = useState<FormResponse>(initialFormState);

  const [toggledLeftbar, setToggledLeftbar] = useState<boolean>(false);

  const { data } = useGetFormDetailsQuery({ id: formId });

  useEffect(() => {
    if (!data) return;
    setForm(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <BuildFormContext.Provider
      value={{ form, setForm, toggledLeftbar, setToggledLeftbar, isEditForm }}
    >
      {children}
    </BuildFormContext.Provider>
  );
};

export const useBuildFormContext = () => useContext(BuildFormContext);
