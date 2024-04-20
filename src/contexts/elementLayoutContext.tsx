import React, { createContext, ReactNode, useContext, useState } from 'react';

import { ElementItem } from '@/types';

interface ElementLayoutContextType {
  elements: ElementItem[];
  setElements: React.Dispatch<React.SetStateAction<ElementItem[]>>;
  showRightbar: boolean;
  setShowRightbar: React.Dispatch<React.SetStateAction<boolean>>;
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
  showRightbar: false,
  setShowRightbar: () => {},
});

export const ElementLayoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showRightbar, setShowRightbar] = useState<boolean>(false);
  const [elements, setElements] = useState<ElementItem[]>([]);
  const [edittingItem, setEdittingItem] = useState<ElementItem>();

  return (
    <ElementLayoutContext.Provider
      value={{
        showRightbar,
        setShowRightbar,
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
