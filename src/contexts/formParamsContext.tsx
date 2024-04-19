import React, { createContext, ReactNode, useContext, useState } from 'react';

import { GetFormsParams } from '@/types';

interface ParamsContextType {
  params: GetFormsParams;
  setParams: React.Dispatch<React.SetStateAction<GetFormsParams>>;
}

const ParamsContext = createContext<ParamsContextType>({
  params: {},
  setParams: () => {},
});

export const ParamsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [params, setParams] = useState<GetFormsParams>({});

  return (
    <ParamsContext.Provider value={{ params, setParams }}>
      {children}
    </ParamsContext.Provider>
  );
};

export const useParams = () => useContext(ParamsContext);
