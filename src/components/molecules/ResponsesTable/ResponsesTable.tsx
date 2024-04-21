import { useEffect, useMemo, useState } from 'react';
import sortBy from 'lodash.sortby';
import toString from 'lodash.tostring';
import {
  DataTable,
  DataTableColumn,
  DataTableSortStatus,
} from 'mantine-datatable';

import { GetResponsesParams } from '@/types';
import { isKeyOfObject } from '@/utils';

interface ResponsesTableProps {
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

interface CellTable {
  accessor: string;
  nowrap: boolean;
  sortable: boolean;
  title: string;
}

export type ResponseRow =
  | {
      id: number;
      createdAt: string;
    }
  | StringProperties;

export const ResponsesTable = (props: ResponsesTableProps) => {
  const {
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

  const elementsKeys = Object.keys(responseRows[0]);

  const columns: DataTableColumn<ResponseRow>[] = useMemo(
    () =>
      elementsKeys
        .filter((key) => !key.includes('Field'))
        .reduce<CellTable[]>((keys, key, currentIndex, array) => {
          if (key.includes('ValueElement')) return keys;
          if (
            key.includes('NameElement') &&
            isKeyOfObject(key, responseRows[0])
          )
            return [
              ...keys,
              {
                accessor: `${array[currentIndex + 1]}`,
                cellsClassName:
                  'cursor-pointer text-center hover:bg-malachite-100',
                title: toString(responseRows[0][key]),
                ...columnProps,
              },
            ];
          return [
            ...keys,
            {
              accessor: key,
              cellsClassName:
                'cursor-pointer text-center hover:bg-malachite-100',
              title: key === 'createdAt' ? 'Created At' : key,
              ...columnProps,
            },
          ];
        }, []),
    [elementsKeys, responseRows],
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
