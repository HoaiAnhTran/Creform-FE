import React, { createContext, ReactNode, useContext, useState } from 'react';

import { ElementItem } from '@/types';

interface ElementLayoutContextType {
  elements: ElementItem[];
  setElements: React.Dispatch<React.SetStateAction<ElementItem[]>>;
  edittingItem?: ElementItem;
  setEdittingItem: React.Dispatch<
    React.SetStateAction<ElementItem | undefined>
  >;
}

const ElementLayoutContext = createContext<ElementLayoutContextType>({
  elements: [],
  setElements: () => {},
  edittingItem: undefined,
  setEdittingItem: () => {},
});

export const ElementLayoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [elements, setElements] = useState<ElementItem[]>([]);
  const [edittingItem, setEdittingItem] = useState<ElementItem>();

  return (
    <ElementLayoutContext.Provider
      value={{
        elements,
        setElements,
        edittingItem,
        setEdittingItem,
      }}
    >
      {children}
    </ElementLayoutContext.Provider>
  );
};

export const useElementLayouts = () => useContext(ElementLayoutContext);
