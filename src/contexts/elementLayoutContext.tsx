import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { defaultHeadingConfig, defaultSubmitConfig } from '@/configs';
import { ElementItem, ElementType } from '@/types';

import { useBuildFormContext } from '.';

interface ElementLayoutContextType {
  elements: ElementItem[];
  setElements: React.Dispatch<React.SetStateAction<ElementItem[]>>;
  edittingItem?: ElementItem;
  setEdittingItem: React.Dispatch<
    React.SetStateAction<ElementItem | undefined>
  >;
  canSubmit?: boolean;
  setCanSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  isReadOnly: boolean;
}

const ElementLayoutContext = createContext<ElementLayoutContextType>({
  elements: [],
  setElements: () => {},
  edittingItem: undefined,
  setEdittingItem: () => {},
  canSubmit: false,
  setCanSubmit: () => {},
  isReadOnly: false,
});

export const DEFAULT_ELEMENTS: ElementItem[] = [
  {
    id: uuidv4(),
    type: ElementType.HEADING,
    gridSize: {
      x: 0,
      y: 0,
      w: 12,
      h: 4,
    },
    config: defaultHeadingConfig,
    fields: [],
  },
  {
    id: uuidv4(),
    type: ElementType.SUBMIT,
    gridSize: {
      x: 0,
      y: 4,
      w: 12,
      h: 4,
    },
    config: defaultSubmitConfig,
    fields: [],
  },
];

export const ElementLayoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isEditForm } = useBuildFormContext();

  const [elements, setElements] = useState<ElementItem[]>(
    isEditForm ? [] : DEFAULT_ELEMENTS,
  );
  const [edittingItem, setEdittingItem] = useState<ElementItem>();
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const location = useLocation();
  const isReadOnly =
    location.pathname.includes('build') &&
    !location.pathname.includes('preview');

  return (
    <ElementLayoutContext.Provider
      value={{
        elements,
        setElements,
        edittingItem,
        setEdittingItem,
        isReadOnly,
        canSubmit,
        setCanSubmit,
      }}
    >
      {children}
    </ElementLayoutContext.Provider>
  );
};

export const useElementLayouts = () => useContext(ElementLayoutContext);
