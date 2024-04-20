import { IoSettingsSharp } from 'react-icons/io5';
import { RiDeleteBinFill } from 'react-icons/ri';
import { Box, Stack, Text } from '@mantine/core';

import { useBuildFormContext, useElementLayouts } from '@/contexts';
import { ElementItem } from '@/types';

interface InteractiveIconProps {
  item: ElementItem;
  removeItem: (id: string) => void;
}

export const InteractiveIcons = ({
  item,
  removeItem,
}: InteractiveIconProps) => {
  const { elements, edittingItem, setEdittingItem } = useElementLayouts();

  const { toggledRightbar, setToggledRightbar } = useBuildFormContext();

  return (
    <>
      <Stack>
        <Box
          onClick={() => {
            setToggledRightbar(!toggledRightbar);
            setEdittingItem(elements.find((element) => element.id === item.id));
          }}
          className='group absolute left-[100%] top-2 ml-3 flex cursor-pointer items-center justify-center gap-2 rounded-full bg-malachite-500 p-2 text-white'
        >
          <IoSettingsSharp className='size-5' />
          <Text className='hidden pr-1 text-sm group-hover:inline-block'>
            Properties
          </Text>
        </Box>
        <Box
          onClick={() => removeItem(edittingItem!.id)}
          className='group absolute bottom-2 left-[100%] ml-3 flex cursor-pointer items-center justify-center gap-2 rounded-full bg-error p-2 text-white'
        >
          <RiDeleteBinFill className='size-5' />
          <Text className='hidden pr-1 text-sm group-hover:inline-block'>
            Remove
          </Text>
        </Box>
      </Stack>
    </>
  );
};
