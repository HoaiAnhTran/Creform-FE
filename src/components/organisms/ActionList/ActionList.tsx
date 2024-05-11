import { useMemo, useState } from 'react';
import { FaFolderPlus, FaTableCells } from 'react-icons/fa6';
import { IoTrash } from 'react-icons/io5';
import { RiTeamFill } from 'react-icons/ri';
import { TbRestore } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { Box, Text } from '@mantine/core';

import { Button } from '@/atoms/Button';
import { PATH } from '@/constants';
import { MESSAGES } from '@/constants/messages';
import { AddToFolderModal } from '@/molecules/AddToFolderModal';
import { ConfirmationModal } from '@/molecules/ComfirmationModal';
import { MoveToTeamModal } from '@/molecules/MoveToTeamModal';
import {
  useDeleteFormMutation,
  useRestoreFormMutation,
} from '@/redux/api/formApi';
import { FormResponse, ModalType, ModalTypes } from '@/types';
import { countSuccessAndErrors, toastify } from '@/utils';

interface ActionListFormProps {
  teamId: string;
  selectedRecords: FormResponse[];
  setSelectedRecords: React.Dispatch<React.SetStateAction<FormResponse[]>>;
}

export const ActionList = ({
  teamId,
  selectedRecords,
  setSelectedRecords,
}: ActionListFormProps) => {
  const selectedFormIds: string[] = selectedRecords.map(({ id }) => id);

  const navigate = useNavigate();

  const [deleteForm, { isLoading: isDeletingForm }] = useDeleteFormMutation();

  const [restoreForm] = useRestoreFormMutation();

  const [modalType, setModalType] = useState<ModalType | ''>('');
  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType('');

  const handleViewSubmissions = () => {
    navigate(
      PATH.RESPONSE_PAGE.replace(':formId', selectedFormIds[0].toString()),
    );
  };

  const handleDeleteMultipleForms = async () => {
    await Promise.allSettled(
      selectedFormIds.map((id) => deleteForm({ id })),
    ).then((response) => {
      const { successCount, errorCount } = countSuccessAndErrors(response);
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
      const { successCount, errorCount } = countSuccessAndErrors(response);
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
      isHidden: false,
    },
    {
      icon: <FaFolderPlus size={24} />,
      title: 'Add to Folder',
      onClick: () => {
        openModal(ModalTypes.ADD_TO_FOLDER);
      },
      isHidden: false,
    },
    {
      icon: <RiTeamFill size={24} />,
      title: 'Move to Team',
      onClick: () => {
        openModal(ModalTypes.MOVE_TO_TEAM);
      },
      isHidden: teamId !== '',
    },
    {
      icon: <IoTrash size={24} />,
      title: 'Delete',
      onClick: handleDeleteMultipleForms,
      isHidden: false,
    },
  ];

  const MultipleFormActions = [
    {
      icon: <FaFolderPlus size={24} />,
      title: 'Add to Folder',
      onClick: () => {
        openModal(ModalTypes.ADD_TO_FOLDER);
      },
      isHidden: false,
    },
    {
      icon: <RiTeamFill size={24} />,
      title: 'Move to Team',
      onClick: () => {
        openModal(ModalTypes.MOVE_TO_TEAM);
      },
      isHidden: teamId !== '',
    },
    {
      icon: <IoTrash size={24} />,
      title: 'Delete',
      onClick: handleDeleteMultipleForms,
      isHidden: false,
    },
  ];

  const FormInTrashActions = [
    {
      icon: <IoTrash size={24} />,
      title: 'Purge',
      onClick: () => {
        openModal(ModalTypes.DELETE_FORM_PERMANENTLY);
      },
      isHidden: false,
    },
    {
      icon: <TbRestore size={24} />,
      title: 'Restore',
      onClick: handleRestoreMultipleForms,
      isHidden: false,
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
    <div className='flex items-center justify-between gap-2'>
      {actionList
        .filter((action) => action.isHidden === false)
        .map((action, index) => (
          <Button
            className='text-sm font-medium'
            size='md'
            key={index}
            variant='outline'
            color={
              action.title === 'Delete' || action.title === 'Purge'
                ? 'error'
                : 'secondary'
            }
            onClick={() => action.onClick()}
            leftSection={action.icon}
            title={action.title}
          />
        ))}

      <AddToFolderModal
        opened={modalType === ModalTypes.ADD_TO_FOLDER}
        onClose={closeModal}
        onClickCancel={closeModal}
        teamId={teamId}
        selectedRecords={selectedRecords}
        setSelectedRecords={setSelectedRecords}
      />
      <MoveToTeamModal
        opened={modalType === ModalTypes.MOVE_TO_TEAM}
        onClose={closeModal}
        onClickCancel={closeModal}
        selectedRecords={selectedRecords}
        setSelectedRecords={setSelectedRecords}
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
