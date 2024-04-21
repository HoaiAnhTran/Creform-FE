import { useEffect, useMemo, useState } from 'react';
import sortBy from 'lodash.sortby';
import {
  DataTable,
  DataTableColumn,
  DataTableSortStatus,
} from 'mantine-datatable';

import { ElementIdAndName, GetResponsesParams } from '@/types';

interface ResponsesTableProps {
  elementIdAndNameList: ElementIdAndName[];
  selectedRecords: ResponseRow[];
  setSelectedRecords: React.Dispatch<React.SetStateAction<ResponseRow[]>>;
  responseRows: ResponseRow[];
  isLoading: boolean;
  totalResponses: number;
  pageSize: number;
  params: GetResponsesParams | undefined;
  setParams: React.Dispatch<
    React.SetStateAction<GetResponsesParams | undefined>
  >;
}

export interface StringProperties {
  [key: string]: string;
}

export type ResponseRow =
  | {
      id: number;
      createdAt: string;
    }
  | StringProperties;

export const ResponsesTable = (props: ResponsesTableProps) => {
  const {
    elementIdAndNameList,
    selectedRecords,
    setSelectedRecords,
    responseRows,
    isLoading,
    totalResponses,
    pageSize,
    params,
    setParams,
  } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortStatus, setSortStatus] = useState<
    DataTableSortStatus<ResponseRow>
  >({
    columnAccessor: 'id',
    direction: 'asc',
  });

  const [records, setRecords] = useState(sortBy(responseRows, 'id'));

  useEffect(() => {
    const data = sortBy(responseRows, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
  }, [sortStatus, responseRows]);

  useEffect(() => {
    setParams({ ...params, page: currentPage });
  }, [currentPage]);

  const columnProps = {
    nowrap: true,
    sortable: true,
    resizable: true,
  };

  const columns: DataTableColumn<ResponseRow>[] = useMemo(
    () => [
      {
        accessor: 'id',
        cellsClassName: 'cursor-pointer text-center hover:bg-malachite-100',
        title: 'id',
        ...columnProps,
      },
      {
        accessor: 'createdAt',
        cellsClassName: 'cursor-pointer text-center hover:bg-malachite-100',
        title: 'Created At',
        ...columnProps,
      },
      ...elementIdAndNameList.map((elementIdAndName) => ({
        accessor: `ValueElement${elementIdAndName.elementId}`,
        cellsClassName: 'cursor-pointer text-center hover:bg-malachite-100',
        title: elementIdAndName.elementName,
        ...columnProps,
      })),
    ],
    [elementIdAndNameList],
  );

  return (
    <DataTable
      withTableBorder
      highlightOnHover
      borderRadius='sm'
      withColumnBorders
      striped
      verticalAlign='top'
      pinLastColumn
      records={records}
      columns={columns}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
      page={currentPage}
      noRecordsText='No records found'
      onPageChange={setCurrentPage}
      totalRecords={totalResponses}
      paginationSize='sm'
      recordsPerPage={pageSize}
      paginationText={({ from, to, totalRecords }) =>
        `Showing ${from} - ${to} of ${totalRecords}`
      }
      fetching={isLoading}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
      loaderType='oval'
      loaderSize='md'
      loaderColor='green'
    />
  );
};
