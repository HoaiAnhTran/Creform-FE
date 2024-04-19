import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { TextInput as TextInputMantine } from '@mantine/core';

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
  const menuItemList: FilterAction[] = [
    {
      field: 'title',
      sortDirection: 'asc',
      title: 'Title [a-z]',
    },
    {
      field: 'title',
      sortDirection: 'desc',
      title: 'Title [z-a]',
    },
    {
      field: 'date',
      sortDirection: 'asc',
      title: 'Date created [asc]',
    },
    {
      field: 'date',
      sortDirection: 'desc',
      title: 'Date created [desc]',
    },
  ];

  const [sortFieldIndex, setSortFieldIndex] = useState(0);

  const handleOnClick = (index: number) => {
    setSortFieldIndex(index);
  };
  const handleOnChange = () => {};

  return (
    <div
      className={cn('flex items-center justify-end', {
        'justify-start': selectedFormIds.length > 0,
      })}
    >
      {selectedFormIds.length > 0 ? (
        <ActionList selectedFormIds={selectedFormIds} />
      ) : (
        <div className='flex items-center gap-2 px-3 py-1'>
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
            size='md'
            leftSection={<CiSearch />}
            onChange={handleOnChange}
          />
        </div>
      )}
    </div>
  );
};
