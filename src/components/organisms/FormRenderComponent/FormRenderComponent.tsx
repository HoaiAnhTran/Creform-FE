import { useEffect } from 'react';
import { Box, Image, LoadingOverlay, Stack, Text } from '@mantine/core';

import { BIG_Z_INDEX } from '@/constants';
import { useElementLayouts } from '@/contexts';
import { FactoryElement } from '@/molecules/FactoryElement';
import { ElementItem, FormDetailsResponse, FormRequest } from '@/types';
import { addTextToFieldOfElement } from '@/utils';

import { ResponsiveReactGridLayout } from '../ResponsiveGridLayout';

interface FormRenderComponentProps {
  form: FormDetailsResponse | FormRequest;
  isLoading?: boolean;
}

export const FormRenderComponent = ({
  form,
  isLoading,
}: FormRenderComponentProps) => {
  const { elements, setElements } = useElementLayouts();

  const handleOnChangeAnswer = (
    elementId: string,
    fieldId: string,
    value: string,
  ) => {
    const onChangingElement = elements.find(
      (element) => element.id === elementId,
    );
    const updatedEdittingField = onChangingElement!.fields.map((field) => {
      if (field.id !== fieldId) return field;
      return {
        id: fieldId,
        name: field.name,
        text: value,
      };
    });
    setElements(
      elements.map((element) => {
        if (element.id !== onChangingElement!.id) return element;
        return {
          ...onChangingElement,
          fields: updatedEdittingField,
        } as ElementItem;
      }),
    );
  };

  useEffect(() => {
    setElements([...addTextToFieldOfElement(form).elements]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  return (
    <div className='flex w-full flex-col items-center'>
      {form.logoUrl && (
        <Image
          src={form.logoUrl}
          className='mb-8 max-h-36 max-w-72 cursor-pointer object-contain'
        />
      )}
      <Stack className='w-[45%] justify-between gap-7'>
        <Box pos='relative' className='w-full'>
          <LoadingOverlay
            visible={isLoading || !form}
            zIndex={BIG_Z_INDEX}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'ocean-green.5' }}
          />
          <div className='w-full rounded-md border border-solid border-slate-200 bg-white p-7 shadow-lg'>
            <Text className='mt-6 px-4 text-2xl font-bold text-ocean-green-600'>
              {form.title}
            </Text>
            <ResponsiveReactGridLayout
              width={120}
              cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
              rowHeight={30}
              measureBeforeMount={true}
              isResizable={false}
              isDroppable={false}
              isDraggable={false}
            >
              {elements.map((element) => (
                <Box
                  key={element.id}
                  data-grid={element.gridSize}
                  className='flex w-full flex-col justify-center px-2'
                >
                  <FactoryElement
                    item={element}
                    isActive={false}
                    removeItem={() => {}}
                    updateItem={() => {}}
                    handleConfig={() => {}}
                    handleOnChangeAnswer={handleOnChangeAnswer}
                  />
                </Box>
              ))}
            </ResponsiveReactGridLayout>
          </div>
        </Box>
      </Stack>
    </div>
  );
};
