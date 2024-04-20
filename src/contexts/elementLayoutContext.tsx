import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ElementItem } from '@/types';

interface ElementLayoutContextType {
  elements: ElementItem[];
  setElements: React.Dispatch<React.SetStateAction<ElementItem[]>>;
  edittingItem?: ElementItem;
  setEdittingItem: React.Dispatch<
    React.SetStateAction<ElementItem | undefined>
  >;
  isReadOnly: boolean;
}

const ElementLayoutContext = createContext<ElementLayoutContextType>({
  elements: [],
  setElements: () => {},
  edittingItem: undefined,
  setEdittingItem: () => {},
  isReadOnly: false,
});

export const ElementLayoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [elements, setElements] = useState<ElementItem[]>([]);
  const [edittingItem, setEdittingItem] = useState<ElementItem>();
  const location = useLocation();
  const isReadOnly = location.pathname.includes('build');

  return (
    <ElementLayoutContext.Provider
      value={{
        elements,
        setElements,
        edittingItem,
        setEdittingItem,
        isReadOnly,
      }}
    >
      {children}
    </ElementLayoutContext.Provider>
  );
};

export const useElementLayouts = () => useContext(ElementLayoutContext);
