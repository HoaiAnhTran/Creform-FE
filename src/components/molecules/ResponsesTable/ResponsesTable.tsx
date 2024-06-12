import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ScrollArea } from '@mantine/core';
import { Text } from '@mantine/core';
import orderby from 'lodash.orderby';
import {
  DataTable,
  DataTableColumn,
  DataTableSortStatus,
} from 'mantine-datatable';

import { DEFAULT_PAGE_SIZE } from '@/constants';
import { useGetResponsesByFormIdQuery } from '@/redux/api/responseApi';
import { ElementIdAndName, GetResponsesParams } from '@/types';
import { formatDate } from '@/utils';

interface ResponsesTableProps {
  elementIdAndNameList: ElementIdAndName[];
  selectedRecords: ResponseRow[];
  setSelectedRecords: React.Dispatch<React.SetStateAction<ResponseRow[]>>;
  responseRows: ResponseRow[];
  params: GetResponsesParams | undefined;
  setParams: React.Dispatch<
    React.SetStateAction<GetResponsesParams | undefined>
  >;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface StringProperties {
  [key: string]: string;
}

export type ResponseRow =
  | {
      id: string;
      createdAt: string;
    }
  | StringProperties;

export const ResponsesTable = (props: ResponsesTableProps) => {
  const {
    elementIdAndNameList,
    selectedRecords,
    setSelectedRecords,
    responseRows,
    params,
    setParams,
    currentPage,
    setCurrentPage,
  } = props;

  const { formId } = useParams();

  const { data, isFetching, refetch } = useGetResponsesByFormIdQuery({
    formId: formId!,
    ...params,
  });

  const [sortStatus, setSortStatus] = useState<
    DataTableSortStatus<ResponseRow>
  >({
    columnAccessor: 'createdAt',
    direction: 'asc',
  });

  const records = useMemo(
    () =>
      orderby(
        responseRows,
        [sortStatus.columnAccessor],
        [sortStatus.direction],
      ),
    [sortStatus, responseRows],
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    setParams({ ...params, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnProps = {
    sortable: true,
    resizable: true,
  };

  const columns: DataTableColumn<ResponseRow>[] = useMemo(
    () => [
      {
        accessor: 'createdAt',
        title: 'Submission Date',
        titleClassName: 'text-center hover:!bg-quarter-pearl-lusta-50',
        cellsClassName: 'h-10 text-center',
        render: (record: ResponseRow) => (
          <Text className='text-sm'>
            {formatDate(record.createdAt, 'MMM D, YYYY HH:mm:ss A')}
          </Text>
        ),
        ...columnProps,
      },
      ...elementIdAndNameList.map((elementIdAndName) => ({
        accessor: `ValueElement${elementIdAndName.elementId}`,
        title: elementIdAndName.elementName,
        titleClassName: 'text-center hover:!bg-quarter-pearl-lusta-50',
        cellsClassName: 'h-10 text-center max-w-[300px] truncate',
        ...columnProps,
      })),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [elementIdAndNameList],
  );

  return (
    <ScrollArea className='w-full'>
      <DataTable
        withTableBorder
        highlightOnHover
        borderRadius='sm'
        withColumnBorders
        verticalAlign='center'
        height={405}
        records={responseRows.length === 0 ? [] : records}
        columns={columns}
        selectionCheckboxProps={{ size: 'xs', color: 'ocean-green.5' }}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
        onRowClick={({ record }) => {
          setSelectedRecords((prev) =>
            prev
              .reduce((acc: ResponseRow[], selectedRecord: ResponseRow) => {
                if (selectedRecord.id !== record.id) acc.push(selectedRecord);
                return acc;
              }, [])
              .concat(prev.some((rec) => rec.id === record.id) ? [] : [record]),
          );
        }}
        noRecordsText='No records found'
        page={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
          setParams((prevState) => ({
            ...prevState,
            page,
          }));
        }}
        totalRecords={data?.totalResponses}
        paginationSize='sm'
        recordsPerPage={data?.pageSize ?? DEFAULT_PAGE_SIZE}
        paginationText={({ from, to, totalRecords }) =>
          `Showing ${from} - ${to} of ${totalRecords}`
        }
        paginationActiveBackgroundColor='ocean-green.5'
        fetching={isFetching}
        loaderType='oval'
        loaderSize='md'
        loaderColor='ocean-green.5'
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        classNames={{
          pagination:
            'fixed w-full h-[50px] bottom-0 z-40 border-t-0 shadow-[0_-4px_10px_-6px_rgba(0,0,0,0.2)]',
        }}
        rowClassName='hover:!bg-quarter-pearl-lusta-50 data-[selected]:bg-quarter-pearl-lusta-50 data-[selected]:hover:!bg-quarter-pearl-lusta-50 cursor-pointer'
      />
    </ScrollArea>
  );
};
