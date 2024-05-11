import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { defaultHeadingConfig, defaultSubmitConfig } from '@/constants';
import { useGetFormDetailsQuery } from '@/redux/api/formApi';
import { ElementItem, ElementType } from '@/types';
import { addTextToFieldOfElement } from '@/utils';

import { useBuildFormContext } from '.';

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
  const { pathname } = useLocation();

  const { id: formId } = useParams();

  const { data: formData } = useGetFormDetailsQuery(
    { id: formId || '' },
    { skip: !formId },
  );

  const { isEditForm } = useBuildFormContext();

  const [elements, setElements] = useState<ElementItem[]>(
    pathname.includes('build') && !isEditForm ? DEFAULT_ELEMENTS : [],
  );
  const [edittingItem, setEdittingItem] = useState<ElementItem>();

  const isReadOnly =
    pathname.includes('build') && !pathname.includes('preview');

  useEffect(() => {
    if (!formData) return;
    setElements(addTextToFieldOfElement(formData).elements as ElementItem[]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

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
