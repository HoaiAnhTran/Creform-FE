import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { TextInput as TextInputMantine } from '@mantine/core';

import { useFormParams } from '@/contexts';
import { Menu } from '@/organisms/Menu';
import { cn } from '@/utils';

import { ActionList } from '../ActionList';

interface TopBarProps {
  selectedFormIds: number[];
}

export interface FilterAction {
  field: string;
  sortDirection: string;
  title: string;
}

export const TopBar = (props: TopBarProps) => {
  const { selectedFormIds } = props;
  const { setParams } = useFormParams();
  const menuItemList: FilterAction[] = [
    {
      field: 'title',
      sortDirection: 'asc',
      title: 'Title [A-Z]',
    },
    {
      field: 'title',
      sortDirection: 'desc',
      title: 'Title [Z-A]',
    },
    {
      field: 'createdAt',
      sortDirection: 'asc',
      title: 'Date created [ASC]',
    },
    {
      field: 'createdAt',
      sortDirection: 'desc',
      title: 'Date created [DESC]',
    },
  ];

  const [sortFieldIndex, setSortFieldIndex] = useState(0);

  const handleOnClick = (item: FilterAction, index: number) => {
    setSortFieldIndex(index);
    setParams((preState) => ({
      ...preState,
      sortField: item.field,
      sortDirection: item.sortDirection,
    }));
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams((preState) => ({
      ...preState,
      search: e.target.value,
    }));
  };

  return (
    <div
      className={cn('flex items-center justify-end p-4', {
        'justify-start': selectedFormIds.length > 0,
      })}
    >
      {selectedFormIds.length > 0 ? (
        <ActionList selectedFormIds={selectedFormIds} />
      ) : (
        <div className='flex items-center justify-between gap-2'>
          <Menu
            width={200}
            shadow='md'
            hasArrow={false}
            arrowOffset={1}
            buttonProps={{
              size: 'md',
              title: menuItemList[sortFieldIndex].title,
            }}
            itemList={menuItemList}
            sortFieldIndex={sortFieldIndex}
            handleOnClick={handleOnClick}
          />
          <TextInputMantine
            placeholder='Search my forms...'
            size='md'
            leftSection={<CiSearch />}
            onChange={handleOnChange}
          />
        </div>
      )}
    </div>
  );
};
