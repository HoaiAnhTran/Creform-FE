import { useState } from 'react';
import { IoSettingsSharp } from 'react-icons/io5';
import { RiDeleteBinFill } from 'react-icons/ri';
import { Box, Stack, Text } from '@mantine/core';

import { useElementLayouts } from '@/contexts';
import { ElementItem } from '@/types';

interface InteractiveIconProps {
  item: ElementItem;
  removeItem: (id: string) => void;
}
export const InteractiveIcon = ({ item, removeItem }: InteractiveIconProps) => {
  const {
    elements,
    edittingItem,
    setEdittingItem,
    showRightbar,
    setShowRightbar,
  } = useElementLayouts();
  const [hoveredElement, sethoveredElement] = useState<string>('');

  return (
    <>
      <Stack>
        <Box
          onClick={() => {
            setShowRightbar(!showRightbar);
            setEdittingItem(elements.find((element) => element.id === item.id));
          }}
          onMouseEnter={() => sethoveredElement('Properties')}
          onMouseLeave={() => sethoveredElement('')}
          className='absolute left-[100%] top-2 ml-3 flex cursor-pointer items-center justify-center gap-2 rounded-full bg-malachite-500 p-2 text-white'
        >
          <IoSettingsSharp className='size-5' />
          {hoveredElement === 'Properties' && (
            <Text className='pr-1 text-sm'>Properties</Text>
          )}
        </Box>
        <Box
          onClick={() => removeItem(edittingItem!.id)}
          onMouseEnter={() => sethoveredElement('Remove')}
          onMouseLeave={() => sethoveredElement('')}
          className='absolute bottom-2 left-[100%] ml-3 flex cursor-pointer items-center justify-center gap-2 rounded-full bg-error p-2 text-white'
        >
          <RiDeleteBinFill className='size-5' />
          {hoveredElement === 'Remove' && (
            <Text className='pr-1 text-sm'>Remove</Text>
          )}
        </Box>
      </Stack>
    </>
  );
};
