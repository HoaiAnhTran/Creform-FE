import { Box, Image, Stack } from '@mantine/core';

import { FactoryElement } from '@/molecules/FactoryElement';
import { FormResponse } from '@/types';

import { ResponsiveReactGridLayout } from '../ResponsiveGridLayout';

interface FormRenderComponentProps {
  form?: FormResponse;
}

export const FormRenderComponent = ({ form }: FormRenderComponentProps) => (
  <div className='flex min-h-screen w-full flex-col items-center bg-malachite-50 pt-8'>
    {form?.logoUrl && (
      <Image
        src={form?.logoUrl}
        className='mb-8 h-[140px] w-[360px] object-cover'
      />
    )}
    <Stack className='w-[45%] justify-between gap-7'>
      <div className='w-full rounded-md border border-solid border-slate-200 bg-white p-7 shadow-lg'>
        <ResponsiveReactGridLayout
          rowHeight={30}
          isResizable={false}
          isDroppable={false}
          isDraggable={false}
        >
          {form?.elements.map((element) => (
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
              />
            </Box>
          ))}
        </ResponsiveReactGridLayout>
      </div>
    </Stack>
  </div>
);
