import { Box, Text } from '@mantine/core';

import { FactoryElement } from '@/molecules/FactoryElement';
import { TemplateResponse } from '@/types';

import { ResponsiveReactGridLayout } from '../ResponsiveGridLayout';

interface TemplateRenderComponentProps {
  template: TemplateResponse;
}

export const TemplateRenderComponent = ({
  template,
}: TemplateRenderComponentProps) => (
  <Box className='w-full'>
    <div className='w-full rounded-md border border-solid border-slate-200 bg-white p-7 shadow-lg'>
      <Text className='mt-6 px-4 text-2xl font-bold text-ocean-green-600'>
        {template.name}
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
        {template.elements.map((element) => (
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
              handleOnChangeAnswer={() => {}}
            />
          </Box>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  </Box>
);
