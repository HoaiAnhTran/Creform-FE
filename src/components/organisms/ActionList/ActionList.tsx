/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { AiOutlineTeam } from 'react-icons/ai';
import { FaTableCells } from 'react-icons/fa6';
import { HiDocumentReport, HiTrash } from 'react-icons/hi';

import { Button } from '@/atoms/Button';
import { MESSAGES } from '@/constants/messages';
import { useOverviewContext } from '@/contexts';
import { AddToFolderModal } from '@/molecules/AddToFolderModal';
import { MoveToTeamModal } from '@/molecules/MoveToTeamModal';
import { useDeleteFormMutation } from '@/redux/api/formApi';
import { ModalType, ModalTypes } from '@/types';
import { toastify } from '@/utils';

interface ActionListFormProps {
  selectedFormIds: number[];
}

export const ActionList = ({ selectedFormIds }: ActionListFormProps) => {
  const { setSelectedRecords } = useOverviewContext();

  const [deleteForm] = useDeleteFormMutation();

  const [modalType, setModalType] = useState<ModalType | ''>('');
  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType('');

  const handleViewSubmissions = () => {};

  const handleDeleteForm = async () => {
    await Promise.allSettled(
      selectedFormIds.map((id) => deleteForm({ id })),
    ).then((response) => {
      const { successCount, errorCount } = response.reduce<{
        successCount: number;
        errorCount: number;
      }>(
        (acc, res) => {
          if (res.status === 'fulfilled') {
            acc.successCount += 1;
            return acc;
          }
          acc.errorCount += 1;
          return acc;
        },
        { successCount: 0, errorCount: 0 },
      );

      if (successCount === response.length) {
        toastify.displaySuccess(MESSAGES.DELETE_FORM_SUCCESS);
        closeModal();
      } else if (errorCount > 0) {
        toastify.displayError(`${errorCount} form(s) failed to delete`);
      }
      setSelectedRecords([]);
    });
  };

  const SingleFormActions = [
    {
      icon: <FaTableCells size={24} />,
      title: 'Submissions',
      onClick: handleViewSubmissions,
    },
    {
      icon: <HiDocumentReport size={24} />,
      title: 'Add to Folder',
      onClick: () => {
        openModal(ModalTypes.ADD_TO_FOLDER);
      },
    },
    {
      icon: <AiOutlineTeam size={24} />,
      title: 'Move to Team',
      onClick: () => {
        openModal(ModalTypes.MOVE_TO_TEAM);
      },
    },
    {
      icon: <HiTrash size={24} />,
      title: 'Delete',
      onClick: handleDeleteForm,
    },
  ];

  const MultipleFormActions = [
    {
      icon: <HiDocumentReport size={24} />,
      title: 'Add to folder',
      onClick: () => {
        openModal(ModalTypes.ADD_TO_FOLDER);
      },
    },
    {
      icon: <AiOutlineTeam size={24} />,
      title: 'Move to team',
      onClick: () => {
        openModal(ModalTypes.MOVE_TO_TEAM);
      },
    },
    {
      icon: <HiTrash size={24} />,
      title: 'Delete',
      onClick: handleDeleteForm,
    },
  ];

  return (
    <div className='flex items-center gap-2 border px-3 py-1'>
      {selectedFormIds.length > 1
        ? MultipleFormActions.map((action, index) => (
            <Button
              className='text-sm font-medium'
              size='md'
              key={index}
              variant='outline'
              color={action.title === 'Delete' ? 'error' : 'primary'}
              onClick={() => action.onClick()}
              leftSection={action.icon}
              title={action.title}
            />
          ))
        : SingleFormActions.map((action, index) => (
            <Button
              className='text-sm font-medium'
              size='md'
              key={index}
              variant='outline'
              color={action.title === 'Delete' ? 'error' : 'primary'}
              leftSection={action.icon}
              onClick={() => action.onClick()}
              title={action.title}
            />
          ))}
      <AddToFolderModal
        opened={modalType === ModalTypes.ADD_TO_FOLDER}
        onClose={closeModal}
        closeModal={closeModal}
        selectedFormIds={selectedFormIds}
      />
      <MoveToTeamModal
        opened={modalType === ModalTypes.MOVE_TO_TEAM}
        onClose={closeModal}
        closeModal={closeModal}
        selectedFormIds={selectedFormIds}
      />
    </div>
  );
};
