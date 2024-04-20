import { useEffect, useMemo, useState } from 'react';
import { BsFileText } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { IoEye, IoTrash } from 'react-icons/io5';
import { RiFolderAddFill, RiTeamFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { ActionIcon, Anchor, Group, Menu, Stack, Text } from '@mantine/core';
import { DataTable, DataTableColumn } from 'mantine-datatable';

import { Button } from '@/atoms/Button';
import {
  DEFAULT_PAGE_SIZE,
  defaultFormsParams,
} from '@/constants/defaultFormsParams';
import { PATH } from '@/constants/routes';
import { sortOptionList } from '@/constants/sortOptions';
import { useFormParams } from '@/contexts';
import {
  useAddToFavouritesMutation,
  useDeleteFormMutation,
  useGetMyFormsQuery,
  useRestoreFormMutation,
} from '@/redux/api/formApi';
import { ErrorResponse, FormResponse } from '@/types';
import { formatDate, toastify } from '@/utils';

interface FormsTableProps {
  selectedRecords: FormResponse[];
  setSelectedRecords: React.Dispatch<React.SetStateAction<FormResponse[]>>;
}

export const FormsTable = ({
  selectedRecords,
  setSelectedRecords,
}: FormsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { params, setParams, sortOptionIndex } = useFormParams();

  const navigate = useNavigate();

  const { data, isFetching: isFormFetching } = useGetMyFormsQuery(params);
  const [addToFavouritesMutation, { isLoading: isAddingToFavourites }] =
    useAddToFavouritesMutation();

  const [deleteForm, { isLoading: isDeletingForm }] = useDeleteFormMutation();
  const [restoreForm, { isLoading: isRestoringForm }] =
    useRestoreFormMutation();

  const handleDeleteForm = (record: FormResponse) => {
    deleteForm({ id: record.id }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message);
        return;
      }
      if (res.error as ErrorResponse) {
        toastify.displayError((res.error as ErrorResponse).message);
      }
    });
  };

  const handleRestoreForm = (record: FormResponse) => {
    restoreForm({ id: record.id }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message);
        return;
      }
      if (res.error as ErrorResponse) {
        toastify.displayError((res.error as ErrorResponse).message);
      }
    });
  };

  const moreOptions = [
    { text: 'View', icon: <IoEye size={18} />, handleClick: () => {} },
    {
      text: 'Add to Folder',
      icon: <RiFolderAddFill size={18} />,
      handleClick: () => {},
    },
    {
      text: 'Move to Team',
      icon: <RiTeamFill size={18} />,
      handleClick: () => {},
    },
    {
      text: 'Delete',
      icon: <IoTrash size={18} />,
      handleClick: (record: FormResponse) => handleDeleteForm(record),
    },
  ];

  const columns: DataTableColumn<FormResponse>[] = useMemo(
    () => [
      {
        accessor: 'isFavourite',
        render: (record: FormResponse) => (
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
        render: (record: FormResponse) => (
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
        render: (record: FormResponse) =>
          record.deletedAt === null ? (
            <Button
              title='Edit Form'
              variant='subtle'
              classNames={{
                inner: 'w-20',
                root: 'flex justify-center items-center',
              }}
              className='h-full w-full font-medium focus:font-bold'
              onClick={() => {
                navigate(`${PATH.BUILD_FORM_PAGE}/${record.id}`);
              }}
            />
          ) : (
            <Button
              title='Purge'
              variant='subtle'
              className='font-medium'
              onClick={() => handleDeleteForm(record)}
            />
          ),
        cellsClassName: 'cursor-pointer  hover:bg-malachite-100 w-30 h-20 p-0',
      },
      {
        accessor: 'more',

        render: (record: FormResponse) =>
          record.deletedAt === null ? (
            <Menu shadow='sm' offset={10} position='bottom-end' withArrow>
              <Menu.Target>
                <Button
                  onClick={() => {
                    setSelectedRecords([record]);
                  }}
                  title='More'
                  variant='subtle'
                  rightSection={<IoIosArrowDown />}
                  classNames={{
                    inner: 'w-20',
                    root: 'flex justify-center items-center',
                  }}
                  className='h-full w-full font-medium focus:font-bold'
                />
              </Menu.Target>

              <Menu.Dropdown className='min-w-[200px]'>
                {moreOptions.map((option, index) => (
                  <Menu.Item
                    key={index}
                    leftSection={option.icon}
                    className='gap-4 px-4 py-3 font-medium text-gray-600 delay-100 ease-linear hover:bg-malachite-50 hover:text-malachite-500'
                    onClick={() => option.handleClick(record)}
                  >
                    {option.text}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Button
              title='Restore'
              variant='subtle'
              className='font-medium'
              onClick={() => handleRestoreForm(record)}
            />
          ),
        cellsClassName:
          'cursor-pointer flex justify-center items-center hover:bg-malachite-100 w-30 h-20 p-0',
      },
    ],
    [],
  );

  useEffect(() => {
    setParams({
      ...defaultFormsParams,
      page: currentPage,
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
      fetching={
        isAddingToFavourites ||
        isDeletingForm ||
        isFormFetching ||
        isRestoringForm
      }
      loaderType='oval'
      loaderSize='md'
      loaderColor='green'
    />
  );
};
