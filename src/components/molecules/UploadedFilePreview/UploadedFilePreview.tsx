import { FaFileCircleCheck } from 'react-icons/fa6';
import { IoCloseOutline } from 'react-icons/io5';
import { ActionIcon, Group, Progress, Text } from '@mantine/core';

interface UploadedFilePreviewProps {
  fileName: string;
  fileSize: string;
  handleClearUploadedFile: () => void;
}

export const UploadedFilePreview = ({
  fileName,
  fileSize,
  handleClearUploadedFile,
}: UploadedFilePreviewProps) => (
  <Group className='h-16 flex-nowrap items-center justify-between gap-3 rounded-lg bg-ocean-green-50 px-4 py-3'>
    <FaFileCircleCheck size={26} className='text-ocean-green-500' />
    <div className='flex flex-col items-start justify-between gap-0.5'>
      <Text className='w-[100px] truncate text-[15px] font-semibold text-ocean-green-500'>
        {fileName}
      </Text>
      <Text className='text-xs text-slate-400'>{fileSize}</Text>
    </div>
    <Progress color='ocean-green.5' value={100} className='w-[300px] flex-1' />
    <ActionIcon
      variant='transparent'
      onClick={handleClearUploadedFile}
      className='text-slate-400 hover:text-slate-500'
    >
      <IoCloseOutline size={19} />
    </ActionIcon>
  </Group>
);
