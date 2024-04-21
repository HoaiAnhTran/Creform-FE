import { useMemo, useState } from 'react';
import { AiOutlineTeam } from 'react-icons/ai';
import { FaTableCells } from 'react-icons/fa6';
import { HiDocumentReport, HiTrash } from 'react-icons/hi';
import { IoTrash } from 'react-icons/io5';
import { TbRestore } from 'react-icons/tb';
import { Box, Text } from '@mantine/core';

import { Button } from '@/atoms/Button';
import { MESSAGES } from '@/constants/messages';
import { useOverviewContext } from '@/contexts';
import { AddToFolderModal } from '@/molecules/AddToFolderModal';
import { ConfirmationModal } from '@/molecules/ComfirmationModal';
import { MoveToTeamModal } from '@/molecules/MoveToTeamModal';
import {
  useDeleteFormMutation,
  useRestoreFormMutation,
} from '@/redux/api/formApi';
import { ModalType, ModalTypes } from '@/types';
import { toastify } from '@/utils';

interface ActionListFormProps {
  selectedFormIds: number[];
}

export const ActionList = ({ selectedFormIds }: ActionListFormProps) => {
  const { selectedRecords, setSelectedRecords } = useOverviewContext();

  const [deleteForm, { isLoading: isDeletingForm }] = useDeleteFormMutation();

  const [restoreForm] = useRestoreFormMutation();

  const [modalType, setModalType] = useState<ModalType | ''>('');
  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType('');

  const handleViewSubmissions = () => {};

  const handleDeleteMultipleForms = async () => {
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

  const handleRestoreMultipleForms = async () => {
    await Promise.allSettled(
      selectedFormIds.map((id) => restoreForm({ id })),
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
        toastify.displaySuccess(MESSAGES.RESTORE_FORM_SUCCESS);
        closeModal();
      } else if (errorCount > 0) {
        toastify.displayError(`${errorCount} form(s) failed to restore`);
      }
      setSelectedRecords([]);
    });
  };

  const isFormsInTrash =
    selectedRecords.findIndex((form) => form.deletedAt !== null) !== -1;

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
      onClick: handleDeleteMultipleForms,
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
      onClick: handleDeleteMultipleForms,
    },
  ];

  const FormInTrashActions = [
    {
      icon: <HiTrash size={24} />,
      title: 'Purge',
      onClick: () => {
        openModal(ModalTypes.DELETE_FORM_PERMANENTLY);
      },
    },
    {
      icon: <TbRestore size={24} />,
      title: 'Restore',
      onClick: handleRestoreMultipleForms,
    },
  ];

  const actionList = useMemo(() => {
    if (isFormsInTrash) {
      return FormInTrashActions;
    }
    if (selectedFormIds.length > 1) {
      return MultipleFormActions;
    } else {
      return SingleFormActions;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFormsInTrash, selectedFormIds]);

  return (
    <div className='flex items-center gap-2 border px-3 py-1'>
      {actionList.map((action, index) => (
        <Button
          className='text-sm font-medium'
          size='md'
          key={index}
          variant='outline'
          color={
            action.title === 'Delete' || action.title === 'Purge'
              ? 'error'
              : 'primary'
          }
          onClick={() => action.onClick()}
          leftSection={action.icon}
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
      <ConfirmationModal
        size='lg'
        body={
          <Box className='flex flex-col items-center gap-3 px-10 py-5'>
            <IoTrash size={70} className='text-error' />
            <Text size='lg' className='font-bold'>
              Delete Form
            </Text>
            <Text className='text-center'>
              Selected form(s) and all of its submissions will be deleted
              permanently. This operation cannot be undone.
            </Text>
          </Box>
        }
        opened={modalType === ModalTypes.DELETE_FORM_PERMANENTLY}
        onClose={closeModal}
        onClickBack={closeModal}
        onClickConfirm={handleDeleteMultipleForms}
        isLoading={isDeletingForm}
      />
    </div>
  );
};
