import { useEffect, useState } from 'react';
import { BsFileText } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { IoEye, IoTrash } from 'react-icons/io5';
import { MdModeEditOutline } from 'react-icons/md';
import { RiFolderAddFill, RiTeamFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { ActionIcon, Anchor, Group, Menu, Stack, Text } from '@mantine/core';
import { DataTable, DataTableColumn } from 'mantine-datatable';

import { Button } from '@/atoms/Button';
import { PATH } from '@/constants/routes';
import { sortOptionList } from '@/constants/sortOptions';
import { useFormParams } from '@/contexts';
import {
  useAddToFavouritesMutation,
  useGetMyFormsQuery,
} from '@/redux/api/formApi';
import { FormResponse } from '@/types';
import { formatDate } from '@/utils';

interface FormsTableProps {
  selectedRecords: FormResponse[];
  setSelectedRecords: React.Dispatch<React.SetStateAction<FormResponse[]>>;
}

const DEFAULT_PAGE_SIZE = 10;

export const FormsTable = ({
  selectedRecords,
  setSelectedRecords,
}: FormsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { params, setParams, sortOptionIndex } = useFormParams();

  const navigate = useNavigate();

  const { data, isLoading } = useGetMyFormsQuery(params);

  const [addToFavouritesMutation, { isLoading: isAddingToFavourites }] =
    useAddToFavouritesMutation();

  const moreOptions = [
    { text: 'View', icon: <IoEye size={18} /> },
    { text: 'Edit', icon: <MdModeEditOutline size={18} /> },
    { text: 'Add to Folder', icon: <RiFolderAddFill size={18} /> },
    { text: 'Move to Team', icon: <RiTeamFill size={18} /> },
    { text: 'Delete', icon: <IoTrash size={18} /> },
  ];

  const columns: DataTableColumn<FormResponse>[] = [
    {
      accessor: 'isFavourite',
      render: (record) => (
        <ActionIcon
          variant='transparent'
          className={
            record.isFavourite
              ? 'text-yellow-500 hover:text-yellow-500'
              : 'text-gray-300 hover:text-gray-300'
          }
          aria-label='Favourites'
          onClick={() => addToFavouritesMutation({ id: record.id })}
        >
          <FaStar size={20} />
        </ActionIcon>
      ),
    },
    {
      accessor: 'title',
      render: (record) => (
        <Group>
          <BsFileText size={36} className='text-malachite-500' />
          <Stack className='gap-2'>
            <Text className='text-lg font-semibold text-gray-900'>
              {record.title}
            </Text>
            <Group className='items-center gap-1'>
              <Anchor
                href=''
                target='_blank'
                underline='hover'
                className='text-sm font-medium text-gray-500 hover:text-malachite-500'
              >
                {record.totalSubmissions} submissions.
              </Anchor>
              <Text className='text-sm font-medium text-gray-500'>
                Created on {formatDate(record.createdAt, 'MMM D, YYYY')}
              </Text>
            </Group>
          </Stack>
        </Group>
      ),
    },
    {
      accessor: 'edit',
      render: (record) => (
        <Button
          title='Edit Form'
          variant='subtle'
          className='font-medium'
          onClick={() => {
            navigate(`${PATH.BUILD_FORM_PAGE}/${record.id}`);
          }}
        />
      ),
      cellsClassName: 'cursor-pointer text-center hover:bg-malachite-100',
    },
    {
      accessor: 'more',
      render: () => (
        <Menu shadow='sm' offset={10} position='bottom-end' withArrow>
          <Menu.Target>
            <Button
              title='More'
              variant='subtle'
              rightSection={<IoIosArrowDown />}
              className='font-medium aria-expanded:font-bold'
            />
          </Menu.Target>

          <Menu.Dropdown className='min-w-[200px]'>
            {moreOptions.map((option, index) => (
              <Menu.Item
                key={index}
                leftSection={option.icon}
                className='gap-4 px-4 py-3 font-medium text-gray-600 delay-100 ease-linear hover:bg-malachite-50 hover:text-malachite-500'
              >
                {option.text}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      ),
      cellsClassName: 'cursor-pointer text-center hover:bg-malachite-100',
    },
  ];

  useEffect(() => {
    setParams({
      page: currentPage,
      pageSize: DEFAULT_PAGE_SIZE,
      sortField: sortOptionList[sortOptionIndex].field,
      sortDirection: sortOptionList[sortOptionIndex].sortDirection,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <DataTable
      noHeader
      minHeight={150}
      withRowBorders={false}
      highlightOnHover
      rowClassName='cursor-pointer'
      columns={columns}
      records={data?.forms}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
      noRecordsText='No records found'
      totalRecords={data?.totalForms}
      recordsPerPage={data?.pageSize ?? DEFAULT_PAGE_SIZE}
      page={currentPage}
      onPageChange={(page) => setCurrentPage(page)}
      paginationSize='sm'
      paginationText={({ from, to, totalRecords }) =>
        `Showing ${from} - ${to} of ${totalRecords}`
      }
      paginationActiveBackgroundColor='green'
      fetching={isLoading || isAddingToFavourites}
      loaderType='oval'
      loaderSize='md'
      loaderColor='green'
    />
  );
};
