import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoCloseOutline } from 'react-icons/io5';
import { ActionIcon, TextInput as TextInputMantine } from '@mantine/core';
import _debounce from 'lodash.debounce';

import { DEFAULT_PAGE_SIZE } from '@/constants/defaultFormsParams';
import {
  DEFAULT_SORT_OPTION_INDEX,
  SORT_OPTION_LIST,
  SortOption,
} from '@/constants/sortOptions';
import { useFormParams } from '@/contexts';
import { Menu as FormFilter } from '@/organisms/Menu';
import { FormResponse } from '@/types';
import { cn } from '@/utils';

import { ActionList } from '../ActionList';

interface TeamActionToolbarProps {
  teamId: string;
  selectedRecords: FormResponse[];
  setSelectedRecords: React.Dispatch<React.SetStateAction<FormResponse[]>>;
}

export const TeamActionToolbar = ({
  teamId,
  selectedRecords,
  setSelectedRecords,
}: TeamActionToolbarProps) => {
  const selectedFormIds: string[] = selectedRecords.map(({ id }) => id);

  const { setParams, setCurrentPage } = useFormParams();

  const [sortOptionIndex, setSortOptionIndex] = useState<number>(
    DEFAULT_SORT_OPTION_INDEX,
  );

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
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      search: value,
    }));
  }, 500);

  const handleOnChangeSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setSearchValue(value);
    setCurrentPage(1);
    debounceSetSearchParam(value);
  };

  const handleClearSearchInput = () => {
    setSearchValue('');
    setCurrentPage(1);
    setParams((prevState) => ({
      ...prevState,
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      search: '',
    }));
  };

  return (
    <div
      className={cn(
        'flex items-center justify-end px-3 py-4 shadow-[0_4px_10px_-6px_rgba(0,0,0,0.2)]',
        {
          'justify-start': selectedFormIds.length > 0,
        },
      )}
    >
      {selectedFormIds.length > 0 ? (
        <ActionList
          teamId={teamId}
          selectedRecords={selectedRecords}
          setSelectedRecords={setSelectedRecords}
        />
      ) : (
        <div className='flex items-center justify-between gap-2'>
          <FormFilter
            width={200}
            shadow='md'
            hasArrow={false}
            arrowOffset={1}
            buttonProps={{
              color: 'secondary',
              variant: 'outline',
              size: 'md',
              title: SORT_OPTION_LIST[sortOptionIndex].title,
              rightSection: SORT_OPTION_LIST[sortOptionIndex].icon,
              className: 'font-semibold text-[15px]',
            }}
            itemList={SORT_OPTION_LIST}
            sortOptionIndex={sortOptionIndex}
            handleOnClick={handleOnClick}
          />
          <TextInputMantine
            placeholder='Search forms...'
            size='md'
            value={searchValue}
            onChange={(event) => handleOnChangeSearchInput(event)}
            leftSection={<CiSearch size={16} />}
            rightSection={
              <ActionIcon
                variant='transparent'
                size='lg'
                onClick={handleClearSearchInput}
                className={cn('invisible text-gray-400 hover:text-gray-500', {
                  visible: searchValue,
                })}
              >
                <IoCloseOutline size={18} />
              </ActionIcon>
            }
          />
        </div>
      )}
    </div>
  );
};
