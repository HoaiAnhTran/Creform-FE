import { IoCloseCircleOutline } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { ActionIcon, Text } from '@mantine/core';

import { Button } from '@/atoms/Button';
import { ResponseRow } from '@/molecules/ResponsesTable';
import {
  useDeleteMultipleResponsesMutation,
  useDeleteOneResponseMutation,
} from '@/redux/api/responseApi';

interface TopBarSubmission {
  formId: number;
  selectedResponseIds: number[];
  setSelectedRecords: React.Dispatch<React.SetStateAction<ResponseRow[]>>;
  showingResponseRows: ResponseRow[];
}

export const TopBarSubmission = (props: TopBarSubmission) => {
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

  const [deleteOneResponse] = useDeleteOneResponseMutation();
  const [deleteMultipleResponses] = useDeleteMultipleResponsesMutation();

  const handleDeleteOneOrMultiple = () => {
    if (selectedResponseIds.length == 1) {
      deleteOneResponse({ formId, responseId: selectedResponseIds[0] });
      return;
    }
    deleteMultipleResponses({ formId, responsesIds: selectedResponseIds });
  };

  if (selectedResponseIds.length === 0)
    return <div className='h-[74px] w-full'></div>;

  return (
    <div className='flex w-full items-center justify-between p-4'>
      <div className='flex gap-2'>
        <div className='flex w-[120px] items-center justify-between rounded-[0.25rem] border border-solid border-malachite-500 bg-white px-2 text-malachite-500'>
          <Text>
            {`${selectedResponseIds.length} ${selectedResponseIds.length === 1 ? 'entry' : 'entries'}`}
          </Text>
          <ActionIcon
            className='h-[8px] w-[8px] rounded-full bg-white text-red-500 hover:bg-white hover:text-red-600'
            onClick={() => {
              setSelectedRecords([]);
            }}
          >
            <IoCloseCircleOutline className='h-full w-full' />
          </ActionIcon>
        </div>
        <Button
          className='font-medium'
          size='md'
          onClick={handleSelectAllOrDeselectClick}
          title={
            showingResponseRows.length > selectedResponseIds.length
              ? 'Select All'
              : 'Unselect All'
          }
        />
      </div>
      <Button
        className='font-medium'
        size='md'
        variant='outline'
        color='error'
        onClick={handleDeleteOneOrMultiple}
        leftSection={<MdDelete size={22} />}
        title={'Delete'}
      />
    </div>
  );
};
