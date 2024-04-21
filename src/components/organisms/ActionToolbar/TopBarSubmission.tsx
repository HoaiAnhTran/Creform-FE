import { IoCloseCircleOutline } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { TiTickOutline } from 'react-icons/ti';
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
    return <div className='h-[74px] w-full bg-slate-200'></div>;

  return (
    <div className='flex w-full items-center justify-between p-4'>
      <div className='flex gap-2'>
        <div className='flex items-center gap-1 rounded-md bg-malachite-500 px-2 text-white hover:bg-malachite-600 hover:text-white'>
          <TiTickOutline />
          <Text>
            {`${selectedResponseIds.length} ${selectedResponseIds.length === 1 ? 'entry' : 'entries'}`}
          </Text>
          <ActionIcon
            className='bg-malachite-300 hover:bg-malachite-400'
            onClick={() => {
              setSelectedRecords([]);
            }}
          >
            <IoCloseCircleOutline />
          </ActionIcon>
        </div>
        <Button
          className='font-medium'
          size='md'
          onClick={handleSelectAllOrDeselectClick}
          title={
            showingResponseRows.length > selectedResponseIds.length
              ? 'Select All'
              : 'Deselect All'
          }
        />
      </div>
      <Button
        className='font-medium'
        size='md'
        variant='outline'
        color='error'
        onClick={handleDeleteOneOrMultiple}
        leftSection={<MdDelete size={16} />}
        title={'Delete'}
      />
    </div>
  );
};
