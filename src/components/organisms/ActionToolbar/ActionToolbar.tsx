import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoCloseOutline } from 'react-icons/io5';
import { ActionIcon, TextInput as TextInputMantine } from '@mantine/core';
import _debounce from 'lodash.debounce';

import { SortOption, sortOptionList } from '@/constants/sortOptions';
import { useFormParams } from '@/contexts';
import { Menu } from '@/organisms/Menu';
import { cn } from '@/utils';

import { ActionList } from '../ActionList';

interface ActionToolbarProps {
  selectedFormIds: number[];
}

export const ActionToolbar = (props: ActionToolbarProps) => {
  const { selectedFormIds } = props;

  const { setParams, sortOptionIndex, setSortOptionIndex } = useFormParams();

  const [searchValue, setSearchValue] = useState<string>('');

  const handleOnClick = (item: SortOption, index: number) => {
    setSortOptionIndex(index);
    setParams((prevState) => ({
      ...prevState,
      sortField: item.field,
      sortDirection: item.sortDirection,
    }));
  };

  const debounceSetSearchParam = _debounce((value: string) => {
    setParams((prevState) => ({
      ...prevState,
      search: value,
    }));
  }, 500);

  const handleOnChangeSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setSearchValue(value);
    debounceSetSearchParam(value);
  };

  const handleClearSearchInput = () => {
    setSearchValue('');
    setParams((prevState) => ({
      ...prevState,
      search: '',
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
              title: sortOptionList[sortOptionIndex].title,
            }}
            itemList={sortOptionList}
            sortOptionIndex={sortOptionIndex}
            handleOnClick={handleOnClick}
          />
          <TextInputMantine
            placeholder='Search my forms...'
            size='md'
            value={searchValue}
            onChange={(event) => handleOnChangeSearchInput(event)}
            leftSection={<CiSearch size={16} />}
            rightSection={
              searchValue && (
                <ActionIcon
                  variant='transparent'
                  size='lg'
                  className='text-gray-400 hover:text-gray-500'
                  onClick={handleClearSearchInput}
                >
                  <IoCloseOutline size={18} />
                </ActionIcon>
              )
            }
          />
        </div>
      )}
    </div>
  );
};
