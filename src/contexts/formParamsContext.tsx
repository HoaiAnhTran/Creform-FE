import React, { createContext, ReactNode, useContext, useState } from 'react';

import { GetFormsParams } from '@/types';

interface FormParamsContextType {
  params: GetFormsParams;
  setParams: React.Dispatch<React.SetStateAction<GetFormsParams>>;
}

const FormParamsContext = createContext<FormParamsContextType>({
  params: {},
  setParams: () => {},
});

export const FormParamsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [params, setParams] = useState<GetFormsParams>({});

  return (
    <FormParamsContext.Provider value={{ params, setParams }}>
      {children}
    </FormParamsContext.Provider>
  );
};

export const useFormParams = () => useContext(FormParamsContext);
