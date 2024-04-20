import { IoMdClose } from 'react-icons/io';
import { Box, Divider, Stack, Text } from '@mantine/core';

import { useElementLayouts } from '@/contexts';
import { isEmailElement, isHeadingElement } from '@/molecules/FactoryElement';
import { HeadingProptertiesConfig } from '@/molecules/HeadingPropertiesConfig';
import { ElementItem } from '@/types';
import { cn } from '@/utils';

export interface BasePropertiesProps<T extends ElementItem = ElementItem> {
  edittingItem: T;
  updateItem: (item: T) => void;
  handleConfig: (config: T['config']) => void;
}

export const PropertiesRightbar = (props: BasePropertiesProps) => {
  const { showRightbar, setShowRightbar } = useElementLayouts();
  const { edittingItem, ...rest } = props;
  return (
    <Box
      className={cn(
        'ease-linea absolute right-0 top-0 z-10 h-screen w-[0] overflow-auto bg-slate-500 transition-all duration-1000',
        { 'w-[350px]': showRightbar },
      )}
    >
      <IoMdClose
        className='absolute right-2 top-2 size-6 cursor-pointer text-white'
        onClick={() => {
          setShowRightbar(false);
        }}
      />
      <Box>
        <Stack className='gap-0'>
          <Box className='flex p-3 text-white'>
            <Text size='lg'>{edittingItem?.type} Properties</Text>
          </Box>
          <Divider color='gray' />
          {(() => {
            switch (true) {
              case isHeadingElement(edittingItem):
                return (
                  <HeadingProptertiesConfig
                    edittingItem={edittingItem}
                    {...rest}
                  />
                );
              case isEmailElement(edittingItem):
                return;
              default:
                return <></>;
            }
          })()}
        </Stack>
      </Box>
    </Box>
  );
};
