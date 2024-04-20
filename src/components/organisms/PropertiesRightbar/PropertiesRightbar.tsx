import { IoMdClose } from 'react-icons/io';
import { Box, Divider, Stack, Text } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';

import { useBuildFormContext } from '@/contexts';
import { EmailProptertiesConfig } from '@/molecules/EmailPropertiesConfig';
import {
  isEmailElement,
  isFullnameElement,
  isHeadingElement,
  isSubmitElement,
} from '@/molecules/FactoryElement';
import { FullnamePropertiesConfig } from '@/molecules/FullnamePropertiesConfig';
import { HeadingProptertiesConfig } from '@/molecules/HeadingPropertiesConfig';
import { SubmitProptertiesConfig } from '@/molecules/SubmitPropertiesConfig';
import { ElementItem } from '@/types';
import { cn } from '@/utils';

export interface BasePropertiesProps<T extends ElementItem = ElementItem> {
  edittingItem: T;
  updateItem: (item: T) => void;
  handleConfig: (config: T['config']) => void;
}

export const PropertiesRightbar = (props: BasePropertiesProps) => {
  const { edittingItem, ...rest } = props;

  const { toggledRightbar, setToggledRightbar } = useBuildFormContext();

  const [scroll] = useWindowScroll();

  return (
    <Box
      className={cn(
        'fixed bottom-0 right-0 top-[120px] z-20 w-[0] overflow-y-scroll bg-slate-500 transition-all duration-[600ms] ease-linear',
        { 'w-[320px]': toggledRightbar },
        { 'top-[50px]': scroll.y > 0 },
      )}
    >
      <IoMdClose
        className='absolute right-2 top-2 size-6 cursor-pointer text-white transition-all duration-150 ease-linear hover:bg-slate-600'
        onClick={() => {
          setToggledRightbar(false);
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
                return (
                  <EmailProptertiesConfig
                    edittingItem={edittingItem}
                    {...rest}
                  />
                );

              case isFullnameElement(edittingItem):
                return (
                  <FullnamePropertiesConfig
                    edittingItem={edittingItem}
                    {...rest}
                  />
                );
              case isSubmitElement(edittingItem):
                return (
                  <SubmitProptertiesConfig
                    edittingItem={edittingItem}
                    {...rest}
                  />
                );
              default:
                return <></>;
            }
          })()}
        </Stack>
      </Box>
    </Box>
  );
};
