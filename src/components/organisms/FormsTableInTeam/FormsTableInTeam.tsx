import { useEffect, useMemo, useState } from 'react';
import { BsFileText } from 'react-icons/bs';
import { FaFileDownload, FaFolder, FaPlayCircle, FaStar } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { IoCopy, IoEye, IoTrash } from 'react-icons/io5';
import { MdDriveFileMoveRtl } from 'react-icons/md';
import { PiPauseCircleFill } from 'react-icons/pi';
import { RiFolderAddFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import {
  ActionIcon,
  Badge,
  Box,
  CloseButton,
  Group,
  Menu,
  Stack,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { DataTable, DataTableColumn } from 'mantine-datatable';

import { Button } from '@/atoms/Button';
import { MESSAGES } from '@/constants';
import {
  DEFAULT_PAGE_SIZE,
  defaultFormsParams,
} from '@/constants/defaultFormsParams';
import { PATH } from '@/constants/routes';
import { useFormParams } from '@/contexts';
import { AddToFolderModal } from '@/molecules/AddToFolderModal';
import { ConfirmationModal } from '@/molecules/ComfirmationModal';
import { DownloadFormAsPDFModal } from '@/molecules/DownloadFormAsPDFModal';
import { SelectedOptionType } from '@/pages/TeamPage';
import {
  useAddToFavouritesMutation,
  useDeleteFormMutation,
  useGetMyFormsQuery,
  useMakeACopyOfFormMutation,
  useRemoveFromFolderMutation,
  useRemoveFromTeamMutation,
  useRestoreFormMutation,
  useUpdateDisabledStatusMutation,
} from '@/redux/api/formApi';
import { useGetMyProfileQuery } from '@/redux/api/userApi';
import {
  ErrorResponse,
  FormResponse,
  ModalType,
  ModalTypes,
  TeamResponse,
} from '@/types';
import { formatDate, toastify } from '@/utils';

interface FormsTableInTeam {
  team: TeamResponse;
  selectedRecords: FormResponse[];
  setSelectedRecords: React.Dispatch<React.SetStateAction<FormResponse[]>>;
  folderId: string;
  selectedOption: SelectedOptionType;
}
export const FormsTableInTeam = ({
  team,
  selectedRecords,
  setSelectedRecords,
  folderId,
  selectedOption,
}: FormsTableInTeam) => {
  const [modalType, setModalType] = useState<ModalType | ''>('');
  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType('');

  const { params, setParams, currentPage, setCurrentPage } = useFormParams();

  const navigate = useNavigate();

  const { data: myProfile } = useGetMyProfileQuery({});

  const {
    data,
    isFetching: isFormFetching,
    refetch,
  } = useGetMyFormsQuery(params);

  const [addToFavouritesMutation, { isLoading: isAddingToFavourites }] =
    useAddToFavouritesMutation();

  const [deleteForm, { isLoading: isDeletingForm }] = useDeleteFormMutation();

  const [restoreForm, { isLoading: isRestoringForm }] =
    useRestoreFormMutation();

  const [removeFromFolder, { isLoading: isRemovingFromFolder }] =
    useRemoveFromFolderMutation();

  const [removeFromTeam, { isLoading: isRemovingFromTeam }] =
    useRemoveFromTeamMutation();

  const [updateDisabledStatus, { isLoading: isUpdatingFormStatus }] =
    useUpdateDisabledStatusMutation();

  const [makeACopyOfForm, { isLoading: isMakingACopyOfForm }] =
    useMakeACopyOfFormMutation();

  const handleDeleteForm = (record: FormResponse) => {
    deleteForm({ id: record.id }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message);
        closeModal();
        setSelectedRecords([]);
        return;
      }
      if (res.error as ErrorResponse) {
        toastify.displayError((res.error as ErrorResponse).message);
        closeModal();
        setSelectedRecords([]);
      }
    });
  };

  const handleRestoreForm = (record: FormResponse) => {
    setSelectedRecords([record]);
    restoreForm({ id: record.id }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message);
        setSelectedRecords([]);
        return;
      }
      if (res.error as ErrorResponse) {
        toastify.displayError((res.error as ErrorResponse).message);
        setSelectedRecords([]);
      }
    });
  };

  const handleRemoveFromFolder = (record: FormResponse) => {
    removeFromFolder({ formId: record.id, folderId: record.folderId }).then(
      (res) => {
        if ('data' in res) {
          toastify.displaySuccess(res.data.message);
          setSelectedRecords([]);
          return;
        }
        if (res.error as ErrorResponse) {
          toastify.displayError((res.error as ErrorResponse).message);
          setSelectedRecords([]);
        }
      },
    );
  };

  const handleRemoveFromTeam = (record: FormResponse) => {
    removeFromTeam({ formId: record.id, teamId: record.teamId }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message);
        closeModal();
        setSelectedRecords([]);
        return;
      }
      if (res.error as ErrorResponse) {
        toastify.displayError((res.error as ErrorResponse).message);
        closeModal();
        setSelectedRecords([]);
      }
    });
  };

  const handleUpdateFormStatus = (
    record: FormResponse,
    action: 'enable' | 'disable',
  ) => {
    updateDisabledStatus({
      formId: record.id,
      disabled: action === 'disable',
    })
      .then(() => {
        toastify.displaySuccess(
          action === 'enable'
            ? MESSAGES.ENABLE_FORM_SUCCESS
            : MESSAGES.DISABLE_FORM_SUCCESS,
        );
        setSelectedRecords([]);
        return;
      })
      .catch(() => {
        toastify.displayError(MESSAGES.UPDATE_FORM_STATUS_FAILED);
        setSelectedRecords([]);
        return;
      });
  };

  const handleMakeACopyOfForm = (record: FormResponse) => {
    makeACopyOfForm({ formId: record.id }).then((res) => {
      if ('data' in res) {
        setSelectedRecords([]);
        return navigate(`${PATH.BUILD_FORM_PAGE}/${res.data.data.id}`);
      }
      if (res.error as ErrorResponse) {
        toastify.displayError((res.error as ErrorResponse).message);
        setSelectedRecords([]);
      }
    });
  };

  const isFetching =
    isFormFetching ||
    isAddingToFavourites ||
    isDeletingForm ||
    isRestoringForm ||
    isRemovingFromFolder ||
    isRemovingFromTeam ||
    isUpdatingFormStatus ||
    isMakingACopyOfForm;

  const moreOptions = useMemo(
    () => (record: FormResponse) => [
      {
        text: 'View',
        icon: <IoEye size={18} />,
        handleClick: (record: FormResponse) => {
          const link = `${window.location.origin}/form/${record.id}`;
          window.open(link, '_blank');
        },
        isHidden: false,
      },
      {
        text: 'Make a Copy',
        icon: <IoCopy size={18} />,
        handleClick: (record: FormResponse) => handleMakeACopyOfForm(record),
        isHidden: false,
      },
      {
        text: 'Add to Folder',
        icon: <RiFolderAddFill size={18} />,
        handleClick: () => {
          openModal(ModalTypes.ADD_TO_FOLDER);
        },
        isHidden: false,
      },
      {
        text: 'Move to My Forms',
        icon: <MdDriveFileMoveRtl size={18} />,
        handleClick: () => {
          openModal(ModalTypes.REMOVE_FROM_TEAM);
        },
        isHidden: record.creator.email !== myProfile?.email,
      },
      {
        text: 'Disable',
        icon: <PiPauseCircleFill size={18} />,
        handleClick: (record: FormResponse) =>
          handleUpdateFormStatus(record, 'disable'),
        isHidden: false,
      },
      {
        text: 'Enable',
        icon: <FaPlayCircle size={18} />,
        handleClick: (record: FormResponse) =>
          handleUpdateFormStatus(record, 'enable'),
        isHidden: false,
      },
      {
        text: 'Download as PDF',
        icon: <FaFileDownload size={18} />,
        handleClick: () => {
          openModal(ModalTypes.DOWNLOAD_FORM_AS_PDF);
        },
        isHidden: false,
      },
      {
        text: 'Delete',
        icon: <IoTrash size={18} />,
        handleClick: (record: FormResponse) => handleDeleteForm(record),
        isHidden: false,
      },
    ],
    [team, myProfile],
  );

  const columns: DataTableColumn<FormResponse>[] = useMemo(
    () => [
      {
        accessor: 'isFavourite',
        render: (record: FormResponse) => (
          <ActionIcon
            variant='transparent'
            className={
              record.isFavourite
                ? 'text-yellow-500 hover:text-yellow-500'
                : 'text-gray-300 hover:text-gray-300'
            }
            aria-label='Favourites'
            onClick={(e) => {
              e.stopPropagation();
              addToFavouritesMutation({ id: record.id });
            }}
          >
            <FaStar size={20} />
          </ActionIcon>
        ),
      },
      {
        accessor: 'title',
        render: (record: FormResponse) => (
          <Group>
            <Tooltip
              color='gray'
              arrowOffset={20}
              arrowSize={5}
              label='This form is currently disabled'
              withArrow
              position='top-start'
              className='text-xs text-white'
              disabled={!record.disabled}
            >
              <UnstyledButton>
                <BsFileText
                  size={36}
                  className={
                    record.disabled ? 'text-gray-400' : 'text-ocean-green-500'
                  }
                />
              </UnstyledButton>
            </Tooltip>
            <Stack className='gap-2'>
              <Group>
                <Text className='text-lg font-semibold text-gray-900'>
                  {record.title}
                </Text>
                {record.folder && (
                  <Box className='group flex h-6 items-center justify-center gap-1 rounded-full bg-burnt-sienna-100 px-2 py-0.5'>
                    <Badge
                      className='m-0 bg-inherit p-0 text-xs normal-case text-burnt-sienna-600'
                      leftSection={<FaFolder />}
                      classNames={{
                        section: 'mr-2',
                      }}
                    >
                      {record.folder.name}
                    </Badge>
                    <CloseButton
                      variant='transparent'
                      size={18}
                      className='hidden text-burnt-sienna-600 group-hover:flex'
                      onClick={() => handleRemoveFromFolder(record)}
                    />
                  </Box>
                )}
              </Group>
              <Group className='items-center gap-1'>
                <UnstyledButton
                  onClick={() => {
                    navigate(
                      PATH.RESPONSE_PAGE.replace(
                        ':formId',
                        record.id.toString(),
                      ),
                    );
                  }}
                  className='text-sm font-medium text-gray-500 hover:text-ocean-green-500 hover:underline'
                >
                  {record.totalSubmissions} submissions.
                </UnstyledButton>
                <Text className='text-sm font-medium text-gray-500'>
                  {`Created on ${formatDate(record.createdAt, 'MMM D, YYYY')} by ${record.creator.email === myProfile?.email ? 'me' : record.creator.username}`}
                </Text>
              </Group>
            </Stack>
          </Group>
        ),
      },
      {
        accessor: 'edit',
        render: (record: FormResponse) =>
          record.deletedAt === null ? (
            <Button
              title='Edit Form'
              color='secondary'
              variant='subtle'
              classNames={{
                inner: 'w-20',
                root: 'flex justify-center items-center',
              }}
              className='h-full w-full font-medium focus:font-bold'
              onClick={(event) => {
                event.stopPropagation();
                navigate(`${PATH.BUILD_FORM_PAGE}/${record.id}`);
              }}
            />
          ) : (
            <Button
              title='Purge'
              color='secondary'
              variant='subtle'
              classNames={{
                inner: 'w-20',
                root: 'flex justify-center items-center',
              }}
              className='h-full w-full font-medium focus:font-bold'
              onClick={(event) => {
                event.stopPropagation();
                setSelectedRecords([record]);
                openModal(ModalTypes.DELETE_FORM_PERMANENTLY);
              }}
            />
          ),
        cellsClassName: 'cursor-pointer hover:bg-ocean-green-100 w-30 h-20 p-0',
      },
      {
        accessor: 'more',
        render: (record: FormResponse) =>
          record.deletedAt === null ? (
            <Menu shadow='sm' offset={10} position='bottom' withArrow>
              <Menu.Target>
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedRecords([record]);
                  }}
                  title='More'
                  color='secondary'
                  variant='subtle'
                  rightSection={<IoIosArrowDown />}
                  classNames={{
                    inner: 'w-20',
                    root: 'flex justify-center items-center',
                  }}
                  className='h-full w-full font-medium aria-expanded:font-bold'
                />
              </Menu.Target>

              <Menu.Dropdown className='min-w-[200px] !bg-ocean-green-100'>
                {record.disabled
                  ? moreOptions(record)
                      .filter(
                        (option) =>
                          option.text !== 'Disable' &&
                          option.isHidden === false,
                      )
                      .map((option, index) => (
                        <Menu.Item
                          key={index}
                          leftSection={option.icon}
                          className='mb-1 mt-0.5 h-[35px] gap-4 px-4 py-2 font-medium text-gray-800 transition-all duration-75 ease-linear last-of-type:mb-0 hover:bg-ocean-green-400 hover:text-white'
                          onClick={(event) => {
                            event.stopPropagation();
                            option.handleClick(record);
                          }}
                        >
                          {option.text}
                        </Menu.Item>
                      ))
                  : moreOptions(record)
                      .filter(
                        (option) =>
                          option.text !== 'Enable' && option.isHidden === false,
                      )
                      .map((option, index) => (
                        <Menu.Item
                          key={index}
                          leftSection={option.icon}
                          className='mb-1 mt-0.5 h-[35px] gap-4 px-4 py-2 font-medium text-gray-800 transition-all duration-75 ease-linear last-of-type:mb-0 hover:bg-ocean-green-400 hover:text-white'
                          onClick={(event) => {
                            event.stopPropagation();
                            option.handleClick(record);
                          }}
                        >
                          {option.text}
                        </Menu.Item>
                      ))}
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Button
              title='Restore'
              color='secondary'
              variant='subtle'
              classNames={{
                inner: 'w-20',
                root: 'flex justify-center items-center',
              }}
              className='h-full w-full font-medium focus:font-bold'
              onClick={(event) => {
                event.stopPropagation();
                handleRestoreForm(record);
              }}
            />
          ),
        cellsClassName: 'cursor-pointer hover:bg-ocean-green-100 w-30 h-20 p-0',
      },
    ],
    [moreOptions, myProfile],
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    setParams({ ...defaultFormsParams });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setParams((prevState) => ({
      ...prevState,
      isDeleted: selectedOption.isTrash ? 1 : 0,
      isFavourite: selectedOption.isFavorites ? 1 : 0,
      teamId: team.id !== '' ? team.id : undefined,
      folderId: folderId !== '' ? folderId : undefined,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team, folderId, selectedOption.isTrash, selectedOption.isFavorites]);

  return (
    <>
      <DataTable
        noHeader
        withRowBorders={false}
        highlightOnHover
        rowClassName='hover:!bg-quarter-pearl-lusta-50 data-[selected]:bg-quarter-pearl-lusta-50 data-[selected]:hover:!bg-quarter-pearl-lusta-50 cursor-pointer'
        columns={columns}
        records={data?.forms}
        selectionCheckboxProps={{ size: 'xs', color: 'ocean-green.5' }}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
        onRowClick={({ record: clickedRecord }) => {
          setSelectedRecords((prev) => {
            const isSelectedRecord =
              prev.findIndex((record) => record.id === clickedRecord.id) !== -1;
            if (isSelectedRecord) {
              return prev.filter((record) => record.id !== clickedRecord.id);
            }
            return [...prev, clickedRecord];
          });
        }}
        noRecordsText='No records found'
        totalRecords={data?.totalForms}
        recordsPerPage={data?.pageSize ?? DEFAULT_PAGE_SIZE}
        page={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
          setParams((prevState) => ({
            ...prevState,
            page,
          }));
        }}
        paginationSize='sm'
        paginationText={({ from, to, totalRecords }) =>
          `Showing ${from} - ${to} of ${totalRecords}`
        }
        paginationActiveBackgroundColor='ocean-green.5'
        fetching={isFetching}
        loaderType='oval'
        loaderSize='md'
        loaderColor='ocean-green.5'
        scrollAreaProps={{
          type: 'scroll',
        }}
        classNames={{
          table: 'pl-3 mb-[50px]',
          pagination:
            'fixed w-[80%] h-[50px] bottom-0 z-40 border-t-0 shadow-[0_-4px_10px_-6px_rgba(0,0,0,0.2)]',
        }}
      />
      <AddToFolderModal
        opened={modalType === ModalTypes.ADD_TO_FOLDER}
        onClose={closeModal}
        onClickCancel={closeModal}
        teamId={team.id}
        selectedRecords={selectedRecords}
        setSelectedRecords={setSelectedRecords}
      />
      <DownloadFormAsPDFModal
        opened={modalType === ModalTypes.DOWNLOAD_FORM_AS_PDF}
        onClose={closeModal}
        formId={selectedRecords[0]?.id}
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
              This form and all of its submissions will be deleted permanently.
              This operation cannot be undone.
            </Text>
          </Box>
        }
        opened={modalType === ModalTypes.DELETE_FORM_PERMANENTLY}
        onClose={closeModal}
        onClickBack={closeModal}
        onClickConfirm={() => handleDeleteForm(selectedRecords[0])}
        isLoading={isDeletingForm}
      />
      <ConfirmationModal
        size='lg'
        body={
          <Box className='flex flex-col items-center gap-3 px-10 py-5'>
            <MdDriveFileMoveRtl size={70} className='text-ocean-green-500' />
            <Text size='lg' className='font-bold'>
              Move to My Forms
            </Text>
            <Text className='text-center'>
              The team members will no longer access this form.
            </Text>
          </Box>
        }
        opened={modalType === ModalTypes.REMOVE_FROM_TEAM}
        onClose={closeModal}
        onClickBack={closeModal}
        onClickConfirm={() => handleRemoveFromTeam(selectedRecords[0])}
        confirmButtonProps={{
          title: 'Move Now',
          className: 'bg-ocean-green-500 hover:bg-ocean-green-600',
        }}
        isLoading={isRemovingFromTeam}
      />
    </>
  );
};
