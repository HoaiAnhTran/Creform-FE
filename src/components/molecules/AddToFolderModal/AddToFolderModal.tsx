import { useEffect, useState } from 'react';
import { FaFolderPlus } from 'react-icons/fa6';
import {
  Box,
  CheckIcon,
  ModalProps as MantineModalProps,
  Radio,
  Text,
} from '@mantine/core';

import { MESSAGES } from '@/constants/messages';
import { useGetMyFoldersQuery } from '@/redux/api/folderApi';
import { useAddToFolderMutation } from '@/redux/api/formApi';
import { useGetTeamDetailsQuery } from '@/redux/api/teamApi';
import { FolderInTeamResponse, FolderResponse, FormResponse } from '@/types';
import { countSuccessAndErrors, isEmpty, toastify } from '@/utils';

import { Modal } from '../Modal';

interface AddToFolderModalProps extends MantineModalProps {
  teamId: string;
  selectedRecords: FormResponse[];
  setSelectedRecords: React.Dispatch<React.SetStateAction<FormResponse[]>>;
  onClickCancel: () => void;
}

export const AddToFolderModal = ({
  teamId,
  selectedRecords,
  setSelectedRecords,
  onClickCancel,
  ...props
}: AddToFolderModalProps) => {
  const [selectedFolderId, setSelectedFolderId] = useState<string>('');

  const selectedFormIds: string[] = selectedRecords.map(({ id }) => id);

  const disabledFolderOptions = selectedRecords.map((form) =>
    form.folderId?.toString(),
  );

  const { data: folders } = useGetMyFoldersQuery();

  const { data: team } = useGetTeamDetailsQuery(
    { id: teamId },
    { skip: teamId === '' },
  );

  const [folderList, setFolderList] = useState<
    FolderResponse[] | FolderInTeamResponse[] | undefined
  >();

  useEffect(() => {
    if (teamId === '') {
      setFolderList(folders);
      return;
    }
    if (team) {
      setFolderList(team.folders);
    }
  }, [team, folders, teamId]);

  const [addToFolder, { isLoading: isAddingToFolder }] =
    useAddToFolderMutation();

  const handleAddToFolder = async () => {
    await Promise.allSettled(
      selectedFormIds.map((id) =>
        addToFolder({ formId: id, folderId: selectedFolderId }),
      ),
    ).then((response) => {
      const { successCount, errorCount } = countSuccessAndErrors(response);
      if (successCount === response.length) {
        toastify.displaySuccess(MESSAGES.ADD_FORM_TO_FOLDER_SUCCESS);
        onClickCancel();
      } else if (errorCount > 0) {
        toastify.displayError(`${errorCount} form(s) failed to add to folder`);
      }
      setSelectedRecords([]);
      setSelectedFolderId('');
    });
  };

  const handleCloseModal = () => {
    onClickCancel();
    setSelectedFolderId('');
  };

  return (
    <Modal
      {...props}
      onClose={handleCloseModal}
      headerIcon={<FaFolderPlus className='text-white' />}
      headerTitle='Add to folder'
      body={
        <Box className='px-3 py-8'>
          {folderList && folderList.length > 0 ? (
            <Radio.Group
              value={selectedFolderId}
              onChange={(value: string) => {
                setSelectedFolderId(value);
              }}
              name='folderOption'
              label='Select a folder below'
              classNames={{ label: 'text-base font-semibold' }}
              className='flex flex-col justify-between gap-4'
            >
              <Box className='flex flex-col items-start justify-between gap-4'>
                {folderList.map((folder) => (
                  <Radio
                    key={folder.id}
                    value={folder.id.toString()}
                    label={folder.name}
                    icon={CheckIcon}
                    color='ocean-green.5'
                    size='sm'
                    disabled={disabledFolderOptions.includes(
                      folder.id.toString(),
                    )}
                    classNames={{
                      radio: 'cursor-pointer',
                      label: 'cursor-pointer',
                    }}
                  />
                ))}
              </Box>
            </Radio.Group>
          ) : (
            <Text className='text-sm font-medium text-slate-500'>
              {isEmpty(teamId)
                ? "You don't have any folders."
                : 'This team currently has no folders.'}
            </Text>
          )}
        </Box>
      }
      onClickCancel={handleCloseModal}
      onClickSubmit={handleAddToFolder}
      canSubmit={selectedFolderId !== ''}
      isLoading={isAddingToFolder}
    />
  );
};
