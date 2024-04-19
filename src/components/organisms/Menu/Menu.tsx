import { TiTick } from 'react-icons/ti';
import { MantineShadow, Menu as MenuMantine } from '@mantine/core';

import { Button, ButtonProps } from '@/atoms/Button';
import { FilterAction } from '@/organisms/TopBar';

interface MenuProps {
  positionArrow?: string;
  arrowOffset?: number;
  hasArrow?: boolean;
  trigger?: 'click' | 'click-hover' | 'hover';
  buttonProps: ButtonProps;
  width?: number;
  shadow?: MantineShadow;
  itemList: FilterAction[];
  sortFieldIndex: number;
  handleOnClick: (index: number) => void;
}

export const Menu = (props: MenuProps) => {
  const {
    buttonProps,
    trigger = 'click',
    arrowOffset = 10,
    hasArrow = false,
    itemList,
    width = 200,
    shadow = 'md',
    handleOnClick,
    sortFieldIndex,
  } = props;

  return (
    <MenuMantine
      position='bottom-start'
      trigger={trigger}
      arrowOffset={arrowOffset}
      withArrow={hasArrow}
      width={width}
      shadow={shadow}
    >
      <MenuMantine.Target>
        <Button {...buttonProps} />
      </MenuMantine.Target>
      <MenuMantine.Dropdown style={{ backgroundColor: '#c5f0c2' }}>
        {itemList.map((item, index) => (
          <MenuMantine.Item
            key={index}
            onClick={() => {
              handleOnClick(index);
            }}
            rightSection={
              itemList[sortFieldIndex].field === item.field &&
              itemList[sortFieldIndex].sortDirection === item.sortDirection ? (
                <TiTick />
              ) : null
            }
          >
            {item.title}
          </MenuMantine.Item>
        ))}
      </MenuMantine.Dropdown>
    </MenuMantine>
  );
};
