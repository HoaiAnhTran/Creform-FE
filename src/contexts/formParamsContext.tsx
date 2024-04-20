import React, { createContext, ReactNode, useContext, useState } from 'react';

import { GetFormsParams } from '@/types';

interface FormParamsContextType {
  params: GetFormsParams;
  setParams: React.Dispatch<React.SetStateAction<GetFormsParams>>;
  sortOptionIndex: number;
  setSortOptionIndex: React.Dispatch<React.SetStateAction<number>>;
}

const FormParamsContext = createContext<FormParamsContextType>({
  params: {},
  setParams: () => {},
  sortOptionIndex: 0,
  setSortOptionIndex: () => {},
});

export const FormParamsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [params, setParams] = useState<GetFormsParams>({});

  const [sortOptionIndex, setSortOptionIndex] = useState(3);

  return (
    <FormParamsContext.Provider
      value={{ params, setParams, sortOptionIndex, setSortOptionIndex }}
    >
      {children}
    </FormParamsContext.Provider>
  );
};

export const useFormParams = () => useContext(FormParamsContext);
