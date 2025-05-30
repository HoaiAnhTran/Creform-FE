import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useGetFormDetailsQuery } from '@/redux/api/formApi';
import { useGetTemplateDetailsQuery } from '@/redux/api/templateApi';
import { FormRequest } from '@/types';

interface BuildFormContextType {
  form: FormRequest;
  setForm: React.Dispatch<React.SetStateAction<FormRequest>>;
  currentLogo: string;
  setCurrentLogo: React.Dispatch<React.SetStateAction<string>>;
  currentTitle: string;
  setCurrentTitle: React.Dispatch<React.SetStateAction<string>>;
  currentLogoFile: File | undefined;
  setCurrentLogoFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  toggledLeftbar: boolean;
  setToggledLeftbar: React.Dispatch<React.SetStateAction<boolean>>;
  toggledRightbar: boolean;
  setToggledRightbar: React.Dispatch<React.SetStateAction<boolean>>;
  previewMode: boolean;
  setPreviewMode: React.Dispatch<React.SetStateAction<boolean>>;
  initLogo: string;
  initTitle: string;
  isEditForm: boolean;
  isPublishSection: boolean;
}

export const initFormRequestState: FormRequest = {
  title: '',
  logoUrl: '',
  settings: {},
  elements: [],
  updatedAt: '',
  createdAt: '',
};

export const DEFAULT_FORM_TITLE = 'Form';

const BuildFormContext = createContext<BuildFormContextType>({
  form: initFormRequestState,
  setForm: () => {},
  currentLogo: '',
  setCurrentLogo: () => {},
  currentTitle: '',
  setCurrentTitle: () => {},
  currentLogoFile: undefined,
  setCurrentLogoFile: () => {},
  toggledLeftbar: false,
  setToggledLeftbar: () => {},
  toggledRightbar: false,
  setToggledRightbar: () => {},
  previewMode: false,
  setPreviewMode: () => {},
  isEditForm: false,
  initLogo: '',
  initTitle: '',
  isPublishSection: false,
});

export const BuildFormContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { id: formId } = useParams();
  const { pathname, state } = useLocation();

  const templateId = state?.templateId || '';

  const isEditForm = Boolean(formId);
  const isPublishSection = pathname.includes('publish');

  const [form, setForm] = useState<FormRequest>(initFormRequestState);
  const [currentLogo, setCurrentLogo] = useState<string>('');
  const [currentLogoFile, setCurrentLogoFile] = useState<File>();
  const [currentTitle, setCurrentTitle] = useState<string>(DEFAULT_FORM_TITLE);
  const [toggledLeftbar, setToggledLeftbar] = useState<boolean>(false);
  const [toggledRightbar, setToggledRightbar] = useState<boolean>(false);
  const [previewMode, setPreviewMode] = useState<boolean>(
    pathname.includes('preview'),
  );

  const { data: formData } = useGetFormDetailsQuery(
    { id: formId || '' },
    { skip: !formId },
  );

  const { data: template } = useGetTemplateDetailsQuery(
    { id: templateId },
    { skip: !templateId },
  );

  const initLogo = formData?.logoUrl || '';
  const initTitle = formData?.title || DEFAULT_FORM_TITLE;

  useEffect(() => {
    if (!formData) return;
    setForm((prev) => ({ ...prev, ...formData }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  useEffect(() => {
    if (isEditForm || !template) return;
    setCurrentTitle(template.name);
    setForm((prev) => ({
      ...prev,
      title: template.name,
      elements: template.elements,
    }));
  }, [isEditForm, template]);

  useEffect(() => {
    setCurrentLogo(initLogo);
  }, [initLogo]);

  return (
    <BuildFormContext.Provider
      value={{
        form,
        setForm,
        currentLogo,
        setCurrentLogo,
        currentLogoFile,
        setCurrentLogoFile,
        currentTitle,
        setCurrentTitle,
        toggledLeftbar,
        setToggledLeftbar,
        toggledRightbar,
        setToggledRightbar,
        previewMode,
        setPreviewMode,
        isEditForm,
        initLogo,
        initTitle,
        isPublishSection,
      }}
    >
      {children}
    </BuildFormContext.Provider>
  );
};

export const useBuildFormContext = () => useContext(BuildFormContext);
