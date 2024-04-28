import { useEffect, useMemo, useState } from 'react';
import orderby from 'lodash.orderby';
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
    setParams({ ...params, page: currentPage });
  }, [currentPage]);

  const columnProps = {
    sortable: true,
    resizable: true,
  };

  const columns: DataTableColumn<ResponseRow>[] = useMemo(
    () => [
      {
        accessor: 'id',
        title: 'ID',
        titleClassName: 'text-center hover:!bg-quarter-pearl-lusta-50',
        cellsClassName: 'h-10 text-center',
        ...columnProps,
      },
      {
        accessor: 'createdAt',
        title: 'Submission Date',
        titleClassName: 'text-center hover:!bg-quarter-pearl-lusta-50',
        cellsClassName: 'h-10 text-center',
        ...columnProps,
      },
      ...elementIdAndNameList.map((elementIdAndName) => ({
        accessor: `ValueElement${elementIdAndName.elementId}`,
        title: elementIdAndName.elementName,
        titleClassName: 'text-center hover:!bg-quarter-pearl-lusta-50',
        cellsClassName: 'h-10 text-center max-w-[300px]',
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
      verticalAlign='center'
      records={records}
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
      page={currentPage}
      noRecordsText='No records found'
      onPageChange={setCurrentPage}
      totalRecords={totalResponses}
      paginationSize='sm'
      recordsPerPage={pageSize}
      paginationText={({ from, to, totalRecords }) =>
        `Showing ${from} - ${to} of ${totalRecords}`
      }
      paginationActiveBackgroundColor='ocean-green.5'
      fetching={isLoading}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
      loaderType='oval'
      loaderSize='md'
      loaderColor='ocean-green.5'
      height={records && records.length > 0 ? 'auto' : '100%'}
      classNames={{
        root: 'overflow-visible',
        pagination: 'fixed w-full h-[50px] bottom-0 z-40',
      }}
      rowClassName='hover:!bg-quarter-pearl-lusta-50 data-[selected]:bg-quarter-pearl-lusta-50 data-[selected]:hover:!bg-quarter-pearl-lusta-50'
    />
  );
};
