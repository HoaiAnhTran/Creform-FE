import { IoMdClose } from 'react-icons/io';
import { Box, Divider, Stack, Text } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';

import { useBuildFormContext } from '@/contexts';
import { AddressPropertiesConfig } from '@/molecules/AddressPropertiesConfig';
import { DatePickerInputPropertiesConfig } from '@/molecules/DatePickerInputPropertiesConfig';
import { DropdownPropertiesConfig } from '@/molecules/DropdownPropertiesConfig';
import { EmailPropertiesConfig } from '@/molecules/EmailPropertiesConfig';
import {
  isAddressElement,
  isDatePickerInputElement,
  isDropdownElement,
  isEmailElement,
  isFileUploadElement,
  isFullnameElement,
  isHeadingElement,
  isImageElement,
  isInputTableElement,
  isLongTextElement,
  isMultipleChoiceElement,
  isNumberPhoneElement,
  isScaleRatingElement,
  isShortTextElement,
  isSingleChoiceElement,
  isSubmitElement,
  isTimeInputElement,
} from '@/molecules/FactoryElement';
import { FileUploadPropertiesConfig } from '@/molecules/FileUploadPropertiesConfig';
import { FullnamePropertiesConfig } from '@/molecules/FullnamePropertiesConfig';
import { HeadingPropertiesConfig } from '@/molecules/HeadingPropertiesConfig';
import { ImagePropertiesConfig } from '@/molecules/ImagePropertiesConfig';
import { InputTablePropertiesConfig } from '@/molecules/InputTablePropertiesConfig';
import { LongTextPropertiesConfig } from '@/molecules/LongTextPropertiesConfig';
import { MultipleChoicePropertiesConfig } from '@/molecules/MultipleChoicePropertiesConfig';
import { PhoneNumberPropertiesConfig } from '@/molecules/PhoneNumberPropertiesConfig';
import { ScaleRatingPropertiesConfig } from '@/molecules/ScaleRatingPropertiesConfig';
import { ShortTextPropertiesConfig } from '@/molecules/ShortTextPropertiesConfig';
import { SingleChoicePropertiesConfig } from '@/molecules/SingleChoicePropertiesConfig';
import { SubmitPropertiesConfig } from '@/molecules/SubmitPropertiesConfig';
import { TimeInputPropertiesConfig } from '@/molecules/TimeInputPropertiesConfig';
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
        'fixed bottom-0 right-0 top-[120px] z-20 w-[320px] translate-x-[320px] overflow-y-scroll bg-slate-500 transition-all duration-500 ease-linear',
        { 'translate-x-[0]': toggledRightbar },
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
                  <HeadingPropertiesConfig
                    edittingItem={edittingItem}
                    {...rest}
                  />
                );
              case isEmailElement(edittingItem):
                return (
                  <EmailPropertiesConfig
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
                  <SubmitPropertiesConfig
                    edittingItem={edittingItem}
                    {...rest}
                  />
                );
              case isShortTextElement(edittingItem):
                return (
                  <ShortTextPropertiesConfig
                    edittingItem={edittingItem}
                    {...rest}
                  />
                );
              case isLongTextElement(edittingItem):
                return (
                  <LongTextPropertiesConfig
                    edittingItem={edittingItem}
                    {...rest}
                  />
                );
              case isScaleRatingElement(edittingItem):
                return (
                  <ScaleRatingPropertiesConfig
                    edittingItem={edittingItem}
                    {...rest}
                  />
                );
              case isAddressElement(edittingItem):
                return (
                  <AddressPropertiesConfig
                    edittingItem={edittingItem}
                    {...rest}
                  />
                );
              case isDropdownElement(edittingItem):
                return (
                  <DropdownPropertiesConfig
                    edittingItem={edittingItem}
                    {...rest}
                  />
                );
              case isSingleChoiceElement(edittingItem):
                return (
                  <SingleChoicePropertiesConfig
                    edittingItem={edittingItem}
                    {...rest}
                  />
                );
              case isMultipleChoiceElement(edittingItem):
                return (
                  <MultipleChoicePropertiesConfig
                    edittingItem={edittingItem}
                    {...rest}
                  />
                );
              case isNumberPhoneElement(edittingItem):
                return (
                  <PhoneNumberPropertiesConfig
                    edittingItem={edittingItem}
                    {...rest}
                  />
                );
              case isDatePickerInputElement(edittingItem):
                return (
                  <DatePickerInputPropertiesConfig
                    edittingItem={edittingItem}
                    {...rest}
                  />
                );
              case isTimeInputElement(edittingItem):
                return (
                  <TimeInputPropertiesConfig
                    edittingItem={edittingItem}
                    {...rest}
                  />
                );
              case isFileUploadElement(edittingItem):
                return (
                  <FileUploadPropertiesConfig
                    edittingItem={edittingItem}
                    {...rest}
                  />
                );
              case isInputTableElement(edittingItem):
                return (
                  <InputTablePropertiesConfig
                    edittingItem={edittingItem}
                    {...rest}
                  />
                );
              case isImageElement(edittingItem):
                return (
                  <ImagePropertiesConfig
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
