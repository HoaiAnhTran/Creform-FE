import { FaDownload } from 'react-icons/fa6';
import { IoTrash } from 'react-icons/io5';
import { Group, Text } from '@mantine/core';
import { saveAs } from 'file-saver';

import { Button } from '@/atoms/Button';
import { MESSAGES } from '@/constants';
import { ResponseRow } from '@/molecules/ResponsesTable';
import {
  useDeleteMultipleResponsesMutation,
  useDeleteOneResponseMutation,
  useLazyGetResponsesExcelFileQuery,
} from '@/redux/api/responseApi';
import { formatDate, toastify } from '@/utils';

interface SubmissionTopbar {
  formId: number;
  selectedResponseIds: number[];
  setSelectedRecords: React.Dispatch<React.SetStateAction<ResponseRow[]>>;
  showingResponseRows: ResponseRow[];
}

export const SubmissionTopbar = (props: SubmissionTopbar) => {
  const {
    selectedResponseIds,
    setSelectedRecords,
    showingResponseRows,
    formId,
  } = props;
  const handleSelectAllOrDeselectClick = () => {
    if (showingResponseRows.length > selectedResponseIds.length) {
      setSelectedRecords(showingResponseRows);
      return;
    }
    setSelectedRecords([]);
  };

  const [deleteOneResponse, { isLoading: isLoadingDeleteOneResponse }] =
    useDeleteOneResponseMutation();

  const [
    deleteMultipleResponses,
    { isLoading: isLoadingDeleteMultipleResponse },
  ] = useDeleteMultipleResponsesMutation();

  const [downloadExcelFile, { isLoading: isDownloadingExcelFile }] =
    useLazyGetResponsesExcelFileQuery();

  const handleDeleteOneOrMultiple = () => {
    if (selectedResponseIds.length == 1) {
      deleteOneResponse({ formId, responseId: selectedResponseIds[0] }).then(
        () => setSelectedRecords([]),
      );
      return;
    }
    deleteMultipleResponses({ formId, responsesIds: selectedResponseIds }).then(
      () => setSelectedRecords([]),
    );
  };

  const handleExportToExcel = async () => {
    try {
      const res = await downloadExcelFile({ formId });

      if (res.data) {
        const blob = new Blob([res.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const fileName = `List-Of-Responses-${formatDate(Date.now(), 'DDMMYYTHHmmss')}.xlsx`;
        return saveAs(blob, fileName);
      }
    } catch (error) {
      toastify.displayError(MESSAGES.EXPORT_TO_EXCEL_FAILED);
    }
  };

  return (
    <div className='flex w-full items-center justify-between p-4'>
      {selectedResponseIds.length === 0 ? (
        <Group className='justify-end w-full'>
          <Button
            title='Export to Excel'
            className='h-[36px] text-sm'
            onClick={handleExportToExcel}
            leftSection={<FaDownload size={15} />}
            loading={isDownloadingExcelFile}
          />
        </Group>
      ) : (
        <>
          <div className='flex items-center justify-between gap-3'>
            <Text className='text-[15px] text-gray-600'>
              {`Selected ${selectedResponseIds.length} ${selectedResponseIds.length === 1 ? 'record' : 'records'}`}
            </Text>
            <Button
              className='h-[36px] text-sm'
              onClick={handleSelectAllOrDeselectClick}
              title={
                showingResponseRows.length > selectedResponseIds.length
                  ? 'Select all'
                  : 'Unselect all'
              }
            />
          </div>
          <Button
            loading={
              isLoadingDeleteOneResponse || isLoadingDeleteMultipleResponse
            }
            className='h-[36px] text-sm'
            loaderProps={{ type: 'dots', color: 'red' }}
            variant='outline'
            color='error'
            onClick={handleDeleteOneOrMultiple}
            leftSection={<IoTrash size={18} />}
            title='Delete'
          />
        </>
      )}
    </div>
  );
};
