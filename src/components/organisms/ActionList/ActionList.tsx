import { AiOutlineTeam } from 'react-icons/ai';
import { FaTableCells } from 'react-icons/fa6';
import { HiDocumentReport } from 'react-icons/hi';
import { HiTrash } from 'react-icons/hi';

import { Button } from '@/atoms/Button';

interface ActionListFormProps {
  selectedFormIds: number[];
}

export const ActionList = (props: ActionListFormProps) => {
  const { selectedFormIds } = props;

  const handleSubmissions = () => {};

  const handleAddToFolder = () => {};

  const handleAddToTeam = () => {};

  const handleArchive = () => {};
  const SingleFormActions = [
    {
      icon: <FaTableCells size='25' />,
      title: 'Submissions',
      onClick: handleSubmissions,
    },
    {
      icon: <HiDocumentReport size='25' />,
      title: 'Add to folder',
      onClick: handleAddToFolder,
    },
    {
      icon: <AiOutlineTeam size='25' />,
      title: 'Move to team',
      onClick: handleAddToTeam,
    },
    {
      icon: <HiTrash size='25' />,
      title: 'Archive',
      onClick: handleArchive,
    },
  ];
  const MultipleFormActions = [
    {
      icon: <HiDocumentReport size='25' />,
      title: 'Add to folder',
      onClick: handleAddToFolder,
    },
    {
      icon: <AiOutlineTeam size='25' />,
      title: 'Move to team',
      onClick: handleAddToTeam,
    },
    {
      icon: <HiTrash size='25' />,
      title: 'Archive',
      onClick: handleArchive,
    },
  ];

  return (
    <div className='flex items-center gap-2 border px-3 py-1'>
      {selectedFormIds.length > 1
        ? MultipleFormActions.map((action, index) => (
            <Button
              className='font-medium'
              size='md'
              key={index}
              variant='outline'
              color={action.title === 'Archive' ? 'error' : 'primary'}
              onClick={() => action.onClick()}
              leftSection={action.icon}
              title={action.title}
            />
          ))
        : SingleFormActions.map((action, index) => (
            <Button
              className='font-medium'
              size='md'
              key={index}
              variant='outline'
              color={action.title === 'Archive' ? 'error' : 'primary'}
              leftSection={action.icon}
              onClick={() => action.onClick()}
              title={action.title}
            />
          ))}
    </div>
  );
};
