import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { IoIosWarning } from 'react-icons/io';
import { IoTrash } from 'react-icons/io5';
import { RiTeamFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  CloseButton,
  Divider,
  Group,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { useFormik } from 'formik';

import { Button } from '@/atoms/Button';
import { ALLOWED_IMAGE_FILE_TYPES, MESSAGES, PATH } from '@/constants';
import { ConfirmationModal } from '@/molecules/ComfirmationModal';
import {
  useDeleteTeamMutation,
  useUpdateTeamMutation,
} from '@/redux/api/teamApi';
import { useUploadImageMutation } from '@/redux/api/uploadApi';
import { useGetMyProfileQuery } from '@/redux/api/userApi';
import {
  ErrorResponse,
  ModalType,
  ModalTypes,
  TeamPayload,
  TeamResponse,
} from '@/types';
import { toastify } from '@/utils';
import { teamNameValidationSchema } from '@/utils/schemas/updateTeamSchema';

enum GeneralSettingsFields {
  TEAM_NAME = 'name',
  LOGO = 'logoUrl',
}

const emptyInitialValues = {
  name: '',
};

interface TeamGeneralSettingsProps {
  team: TeamResponse;
}

export const TeamGeneralSettings = ({ team }: TeamGeneralSettingsProps) => {
  const [modalType, setModalType] = useState<ModalType | ''>('');

  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType('');

  const [editingFieldName, setEditingFieldName] = useState<string>('');

  const [selectedFile, setSelectedFile] = useState<File>();

  const [currentLogo, setCurrentLogo] = useState<string>(team.logoUrl ?? '');

  const logoInputRef = useRef<HTMLInputElement>(null);

  const { data: myProfile } = useGetMyProfileQuery({});

  const [updateTeam, { isLoading: isTeamUpdating }] = useUpdateTeamMutation();

  const [uploadImage, { isLoading: isUploadingImage }] =
    useUploadImageMutation();

  const [deleteTeam, { isLoading: isTeamDeleting }] = useDeleteTeamMutation();

  const navigate = useNavigate();

  const handleDeleteTeam = () => {
    deleteTeam({ id: team.id }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        closeModal();
        navigate(PATH.OVERVIEW_PAGE);
        return;
      }
      if (res.error as ErrorResponse)
        toastify.displayError((res.error as ErrorResponse).message as string);
    });
  };

  const handleEdit = (fieldName: string) => {
    setEditingFieldName(fieldName);
  };

  const handleCancelEdit = () => {
    setEditingFieldName('');
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];

    if (!ALLOWED_IMAGE_FILE_TYPES.includes(file.type)) {
      toastify.displayError(MESSAGES.ONLY_SUPPORT_IMAGE_FILE_TYPES);
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Encoded = reader?.result?.toString() ?? '';
      setCurrentLogo(base64Encoded);
      handleEdit(GeneralSettingsFields.LOGO);
    };
    if (file) {
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
    event.target.value = '';
  };

  const handleUpdateLogo = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    if (selectedFile) {
      uploadImage(selectedFile).then((res) => {
        if ('data' in res) {
          handleUpdateTeam({ logoUrl: res.data.data.url });
          return;
        }
        if (res.error as ErrorResponse)
          toastify.displayError((res.error as ErrorResponse).message);
      });
    }
  };

  const handleRemoveLogo = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    handleUpdateTeam({ logoUrl: '' });
    setCurrentLogo('');
    setSelectedFile(undefined);
  };

  const handleUpdateTeam = (data: TeamPayload) => {
    updateTeam({ id: team.id, data }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        handleCancelEdit();
        return;
      }
      if (res.error as ErrorResponse)
        toastify.displayError((res.error as ErrorResponse).message as string);
    });
  };

  const getInitialValues = useMemo(() => {
    switch (editingFieldName) {
      case GeneralSettingsFields.TEAM_NAME:
        return {
          name: team.name ?? '',
        };
      default:
        return emptyInitialValues;
    }
  }, [editingFieldName, team]);

  const getValidationSchema = useMemo(() => {
    switch (editingFieldName) {
      case GeneralSettingsFields.TEAM_NAME:
        return teamNameValidationSchema;
      default:
        break;
    }
  }, [editingFieldName]);

  const { values, errors, touched, getFieldProps, handleSubmit } = useFormik({
    initialValues: getInitialValues,
    validationSchema: getValidationSchema,
    enableReinitialize: true,
    onSubmit: () => {
      switch (editingFieldName) {
        case GeneralSettingsFields.TEAM_NAME:
          handleUpdateTeam({
            name: values.name ?? undefined,
          });
          break;
        default:
          break;
      }
    },
  });

  return (
    <Stack className='relative h-full gap-10'>
      <Text className='text-[26px] font-semibold text-ocean-green-600'>
        General Settings
      </Text>

      <Stack className='gap-3'>
        <Group className='items-start justify-start gap-32'>
          <span className='mt-2 w-[15%] text-base font-semibold text-slate-800'>
            Team Name
          </span>
          <Group className='flex-1 items-start justify-between'>
            {editingFieldName === GeneralSettingsFields.TEAM_NAME ? (
              <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                <TextInput
                  placeholder='Team name'
                  {...getFieldProps(GeneralSettingsFields.TEAM_NAME)}
                  autoFocus
                />
                {errors.name && touched.name && (
                  <Text className='text-xs text-red-500'>{errors.name}</Text>
                )}
                <Button title='Save' type='submit' disabled={isTeamUpdating} />
              </form>
            ) : (
              <span className='mt-2 text-base font-medium text-slate-800'>
                {team.name}
              </span>
            )}
            {editingFieldName === GeneralSettingsFields.TEAM_NAME ? (
              <CloseButton
                className='text-burnt-sienna-600 hover:!bg-burnt-sienna-50 [&>svg]:!h-4 [&>svg]:!w-4'
                onClick={handleCancelEdit}
              />
            ) : (
              <Button
                title='Edit'
                variant='light'
                onClick={() => handleEdit(GeneralSettingsFields.TEAM_NAME)}
              />
            )}
          </Group>
        </Group>
        <Divider className='my-3' />

        <Group className='items-start justify-start gap-32'>
          <span className='mt-2 w-[15%] text-base font-semibold text-slate-800'>
            Logo
          </span>
          <Group className='flex-1 items-start justify-between'>
            {editingFieldName === GeneralSettingsFields.LOGO ? (
              <Group align='center'>
                <input
                  type='file'
                  ref={logoInputRef}
                  onChange={(event) => handleImageChange(event)}
                  className='hidden'
                  accept={ALLOWED_IMAGE_FILE_TYPES.join(',')}
                />
                <Box
                  className='cursor-pointer rounded-md bg-gray-100 p-1.5'
                  onClick={() => {
                    logoInputRef.current?.click();
                  }}
                >
                  <Avatar
                    size='md'
                    variant='filled'
                    radius='sm'
                    src={currentLogo}
                  />
                </Box>
                <Button
                  title='Save'
                  onClick={(
                    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                  ) => handleUpdateLogo(event)}
                  disabled={isUploadingImage || isTeamUpdating}
                />
                <Button
                  title='Cancel'
                  color='gray'
                  onClick={() => {
                    setCurrentLogo(team.logoUrl ?? '');
                    setSelectedFile(undefined);
                    handleCancelEdit();
                  }}
                  disabled={isUploadingImage || isTeamUpdating}
                />
              </Group>
            ) : (
              <Group>
                <input
                  type='file'
                  ref={logoInputRef}
                  onChange={(event) => handleImageChange(event)}
                  className='hidden'
                  accept={ALLOWED_IMAGE_FILE_TYPES.join(',')}
                />
                <Box
                  className='cursor-pointer rounded-md bg-gray-100 p-1.5'
                  onClick={() => {
                    logoInputRef.current?.click();
                  }}
                >
                  {currentLogo ? (
                    <Avatar
                      size='md'
                      variant='filled'
                      radius='sm'
                      src={currentLogo}
                    />
                  ) : (
                    <Avatar size='md' variant='transparent' radius='sm'>
                      <RiTeamFill size={24} className='text-gray-600' />
                    </Avatar>
                  )}
                </Box>
                {currentLogo ? (
                  <Button
                    title='Remove'
                    variant='outline'
                    onClick={(event) => {
                      handleRemoveLogo(event);
                    }}
                  />
                ) : null}
              </Group>
            )}
          </Group>
        </Group>
        <Divider className='my-3' />

        <Tooltip
          label='Only team owner can delete team'
          withArrow
          arrowOffset={20}
          arrowSize={5}
          position='top'
          className='bg-light-error text-sm font-medium text-error'
          disabled={myProfile?.id === team.creatorId}
        >
          <Button
            title='Delete Team'
            variant='light'
            color='error'
            leftSection={<IoTrash />}
            className='w-max self-end border border-error'
            onClick={() => {
              openModal(ModalTypes.DELETE_TEAM);
            }}
            disabled={myProfile?.id !== team.creatorId}
          />
        </Tooltip>
      </Stack>

      <ConfirmationModal
        size='lg'
        body={
          <Box className='flex flex-col items-center gap-3 px-10 py-5 text-center'>
            <IoIosWarning className='size-28 text-error' />
            <Text size='lg' className='font-bold'>
              Delete team
            </Text>
            <Text className='text-sm leading-6'>
              Are you sure you want to delete this team? <br /> This team and
              all assets in the team will be deleted permanently.
            </Text>
          </Box>
        }
        opened={modalType === ModalTypes.DELETE_TEAM}
        onClose={closeModal}
        onClickBack={closeModal}
        onClickConfirm={handleDeleteTeam}
        isLoading={isTeamDeleting}
      />
    </Stack>
  );
};
