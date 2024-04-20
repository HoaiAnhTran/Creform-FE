import { useEffect, useState } from 'react';
import { Layout, Responsive, WidthProvider } from 'react-grid-layout';
import { useParams } from 'react-router-dom';
import { Box } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';

import {
  defaultEmailConfig,
  defaultFullnameConfig,
  defaultHeadingConfig,
} from '@/configs';
import { useBuildFormContext, useElementLayouts } from '@/contexts';
import { FactoryElement } from '@/molecules/FactoryElement';
import { InteractiveIcons } from '@/molecules/InteractiveIcons';
import { useGetFormDetailsQuery } from '@/redux/api/formApi';
import { ElementItem, ElementType } from '@/types';
import { cn } from '@/utils';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface ResponsiveGridLayoutProps {
  currentElementType: string;
  updateItem: (item: ElementItem) => void;
  handleConfig: (config: ElementItem['config']) => void;
}
export const ResponsiveGridLayout = ({
  currentElementType,
  updateItem,
  handleConfig,
}: ResponsiveGridLayoutProps) => {
  const { elements, setElements, edittingItem, setEdittingItem } =
    useElementLayouts();
  const [mounted, setMounted] = useState(false);
  const [layouts, setLayouts] = useState<{
    lg: Layout[];
    md: Layout[];
    sm: Layout[];
    xs: Layout[];
    xxs: Layout[];
  }>({ lg: [], md: [], sm: [], xs: [], xxs: [] });
  const [isDragging, setIsDragging] = useState(false);
  const { isEditForm } = useBuildFormContext();
  const { id: formId } = useParams();
  const { data: form } = useGetFormDetailsQuery(
    { id: formId || '' },
    { skip: !formId },
  );

  function getLayout(element: ElementItem, layouts: Layout[]) {
    const foundlayout = layouts.find((layout) => element.id === layout.i);
    return {
      x: foundlayout!.x,
      y: foundlayout!.y,
      w: foundlayout!.w,
      h: foundlayout!.h,
    };
  }

  function getElement(elementItems: ElementItem[], layouts: Layout[]) {
    return elementItems.map((elementItem) => {
      const gridSize = getLayout(elementItem, layouts);
      return { ...elementItem, gridSize: gridSize };
    });
  }

  const removeItem = (id: string) => {
    setElements(elements.filter((element) => element.id !== id));
  };

  const createItem = (
    type: string,
    currentItem: Layout,
  ): ElementItem | undefined => {
    const getGridSize = (currentItem: Layout) => ({
      x: currentItem.x,
      y: currentItem.y,
      w: currentItem.w,
      h: currentItem.h,
    });
    switch (type) {
      case ElementType.HEADING:
        return {
          id: currentItem.i,
          type: ElementType.HEADING,
          gridSize: getGridSize(currentItem),
          config: defaultHeadingConfig,
          fields: [],
        };
      case ElementType.EMAIL:
        return {
          id: currentItem.i,
          type: ElementType.EMAIL,
          gridSize: getGridSize(currentItem),
          config: defaultEmailConfig,
          fields: [
            {
              id: uuidv4(),
              name: 'email',
            },
          ],
        };
      case ElementType.FULLNAME:
        return {
          id: currentItem.i,
          type: ElementType.FULLNAME,
          gridSize: getGridSize(currentItem),
          config: defaultFullnameConfig,
          fields: [
            {
              id: uuidv4(),
              name: 'firstName',
            },
            {
              id: uuidv4(),
              name: 'lastName',
            },
          ],
        };
      default:
        return undefined;
    }
  };

  const onDrop = (layout: Layout[]) => {
    const currentItem = [...layout].pop();
    const updatedLayouts = { ...layouts, md: layout };
    setLayouts(updatedLayouts);
    const updatedElements = getElement(elements, layout);
    const createdItem = createItem(currentElementType, currentItem!)!;
    setElements([...updatedElements, createdItem]);
    setEdittingItem(createdItem);
  };

  const handleDragStart = (_layout: Layout[], currentItem: Layout) => {
    setIsDragging(true);
    setEdittingItem(elements.find((element) => element.id === currentItem.i));
  };

  const handleDragStop = (layout: Layout[]) => {
    setElements(getElement(elements, layout));
    setIsDragging(false);
  };
  useEffect(() => {
    if (form) {
      setElements(form.elements as ElementItem[]);
    }
  }, [isEditForm, form, setElements]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className='w-full rounded-md border border-solid border-slate-200 bg-white p-7'>
      <ResponsiveReactGridLayout
        className={cn('min-h-[200px]', {
          'rounded-md border-2 border-dashed border-slate-300 bg-slate-100':
            elements.length < 1,
        })}
        width={120}
        cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
        rowHeight={30}
        layouts={layouts}
        onDrop={onDrop}
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        isResizable={false}
        isDroppable={true}
        onDragStart={handleDragStart}
        onDragStop={handleDragStop}
        droppingItem={{ i: uuidv4(), h: 4, w: 12 }}
      >
        {elements.map((element) => (
          <Box
            key={element.id}
            data-grid={element.gridSize}
            className={cn(
              'flex w-full cursor-move flex-col justify-center px-2',
              {
                'rounded-md  border-[3px] border-solid border-blue-500':
                  element.id === edittingItem?.id,
                'bg-white': isDragging,
              },
            )}
          >
            <FactoryElement
              item={element}
              removeItem={() => removeItem(element.id)}
              isActive={element.id === edittingItem?.id}
              updateItem={updateItem}
              handleConfig={handleConfig}
            />
            {element.id === edittingItem?.id && (
              <InteractiveIcons item={element} removeItem={removeItem} />
            )}
          </Box>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
};
