import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useGetFormDetailsQuery } from '@/redux/api/formApi';
import { FormRequest } from '@/types';

interface BuildFormContextType {
  form: FormRequest;
  initLogo: string;
  setForm: React.Dispatch<React.SetStateAction<FormRequest>>;
  toggledLeftbar: boolean;
  setToggledLeftbar: React.Dispatch<React.SetStateAction<boolean>>;
  toggledRightbar: boolean;
  setToggledRightbar: React.Dispatch<React.SetStateAction<boolean>>;
  previewMode: boolean;
  setPreviewMode: React.Dispatch<React.SetStateAction<boolean>>;
  clickedSubmit: boolean;
  setClickedSubmit: React.Dispatch<React.SetStateAction<boolean>>;
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
  previewMode: false,
  setPreviewMode: () => {},
  clickedSubmit: false,
  setClickedSubmit: () => {},
  isEditForm: false,
  initLogo: '',
});

export const BuildFormContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { id: formId } = useParams();
  const { pathname } = useLocation();

  const isEditForm = Boolean(formId);

  const [form, setForm] = useState<FormRequest>(initFormRequestState);
  const [toggledLeftbar, setToggledLeftbar] = useState<boolean>(false);
  const [toggledRightbar, setToggledRightbar] = useState<boolean>(false);
  const [previewMode, setPreviewMode] = useState<boolean>(
    pathname.includes('preview'),
  );
  const [clickedSubmit, setClickedSubmit] = useState<boolean>(false);

  const { data } = useGetFormDetailsQuery(
    { id: formId || '' },
    { skip: !formId },
  );

  const initLogo = data?.logoUrl || '';

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
        previewMode,
        setPreviewMode,
        clickedSubmit,
        setClickedSubmit,
        isEditForm,
        initLogo,
      }}
    >
      {children}
    </BuildFormContext.Provider>
  );
};

export const useBuildFormContext = () => useContext(BuildFormContext);
