import React, { createContext, ReactNode, useContext, useState } from 'react';

import { GetFormsParams } from '@/types';

interface FormParamsContextType {
  params: GetFormsParams;
  setParams: React.Dispatch<React.SetStateAction<GetFormsParams>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const FormParamsContext = createContext<FormParamsContextType>({
  params: {},
  setParams: () => {},
  currentPage: 0,
  setCurrentPage: () => {},
});

export const FormParamsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [params, setParams] = useState<GetFormsParams>({});

  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <FormParamsContext.Provider
      value={{
        params,
        setParams,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </FormParamsContext.Provider>
  );
};

export const useFormParams = () => useContext(FormParamsContext);
