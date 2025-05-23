import { useMemo, useState } from 'react';
import { IoIosWarning } from 'react-icons/io';
import { IoArrowBackOutline } from 'react-icons/io5';
import { LuExternalLink } from 'react-icons/lu';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ActionIcon,
  Box,
  Group,
  NavLink,
  Tabs as MantineTabs,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import _isEqual from 'lodash.isequal';

import { ToggleButton } from '@/atoms/Button/ToggleButton';
import { PATH } from '@/constants';
import {
  DEFAULT_ELEMENTS,
  DEFAULT_FORM_TITLE,
  initFormRequestState,
  useBuildFormContext,
  useElementLayouts,
} from '@/contexts';
import { ConfirmationModal } from '@/molecules/ComfirmationModal';
import { useGetFormDetailsQuery } from '@/redux/api/formApi';
import { ElementItem } from '@/types';
import { removeTextFromFieldOfElement } from '@/utils';

const tabList = [
  { title: 'Build', value: '/' },
  { title: 'Publish', value: 'publish' },
];

export const BuildFormTopBar = () => {
  const {
    isEditForm,
    isPublishSection,
    form,
    setForm,
    previewMode,
    setPreviewMode,
    setCurrentLogo,
    setCurrentTitle,
    initLogo,
    initTitle,
  } = useBuildFormContext();

  const { setElements } = useElementLayouts();

  const [opened, { open: openConfirmModal, close: closeConfirmModal }] =
    useDisclosure(false);

  const [selectedTabValue, setSelectedTabValue] = useState<string | null>(
    isPublishSection ? tabList[1].value : tabList[0].value,
  );

  const navigate = useNavigate();

  const { pathname, state } = useLocation();

  const { id: formId } = useParams();

  const { data: formData } = useGetFormDetailsQuery(
    { id: formId || '' },
    { skip: !formId },
  );

  const haveUnsavedChanges = useMemo(
    () =>
      !isEditForm || !_isEqual(formData, removeTextFromFieldOfElement(form)),
    [isEditForm, formData, form],
  );

  const formURL = isEditForm ? `${window.location.origin}/form/${form.id}` : '';

  const handleChangeTab = (value: string | null) => {
    // from "build" to "publish"
    if (value === tabList[1].value && !isPublishSection) {
      if (haveUnsavedChanges) {
        openConfirmModal();
        return;
      }
      setSelectedTabValue(value);
      navigate(pathname.concat(`/${value}`));
      return;
    }
    // from "publish" to "build"
    if (value === tabList[0].value && isPublishSection) {
      setSelectedTabValue(value);
      navigate(pathname.replace('/publish', ''));
      return;
    }
  };

  const handleClickPreviewButton = () => {
    setPreviewMode((prevState) => !prevState);
    previewMode
      ? navigate(pathname.replace('/preview', ''))
      : navigate(pathname.concat('/preview'));
  };

  const isFormInTeam: boolean =
    formData?.teamId || state?.teamId ? true : false;

  const handleClickBackButton = () => {
    if (isEditForm && haveUnsavedChanges) {
      openConfirmModal();
      return;
    }
    if (isFormInTeam) {
      const teamId: string = formData?.teamId || state.teamId;
      navigate(PATH.MY_TEAMS_PAGE.replace(':teamId', teamId));
    } else {
      navigate(PATH.OVERVIEW_PAGE);
    }
  };

  const handleDiscardChanges = () => {
    if (isEditForm) {
      setForm({ ...initFormRequestState, ...formData });
      setElements([...(formData?.elements as ElementItem[])]);
    } else {
      setForm({
        ...initFormRequestState,
        title: DEFAULT_FORM_TITLE,
        elements: DEFAULT_ELEMENTS,
      });
      setElements(DEFAULT_ELEMENTS);
    }
    setCurrentTitle(initTitle);
    setCurrentLogo(initLogo);
    closeConfirmModal();
  };

  return (
    <>
      {previewMode ? (
        <Box className='relative flex h-[50px] items-center justify-start gap-0 bg-gradient-to-r from-burnt-sienna-400 to-burnt-sienna-500 pl-10'>
          {isEditForm && (
            <Group className='max-w-fit flex-1 items-center justify-between gap-0'>
              <Text className='rounded-l-[4px] bg-quarter-pearl-lusta-50 px-3 py-1.5 text-xs'>
                {formURL}
              </Text>
              <ActionIcon
                component='button'
                aria-label='Open in a new tab'
                onClick={() => {
                  window.open(formURL, '_blank');
                }}
                className='rounded-l-none rounded-r-[4px] bg-ocean-green-500 text-quarter-pearl-lusta-50 hover:bg-ocean-green-500 hover:text-quarter-pearl-lusta-50'
                disabled={!isEditForm}
              >
                <LuExternalLink />
              </ActionIcon>
            </Group>
          )}
          <ToggleButton
            label='Preview form'
            className='absolute right-10 top-[50%] -translate-y-1/2 text-sm text-quarter-pearl-lusta-50'
            isEnable={previewMode}
            handleToggleButton={handleClickPreviewButton}
          />
        </Box>
      ) : (
        <MantineTabs
          color='#e9aa88'
          variant='pills'
          value={selectedTabValue}
          classNames={{ tabLabel: 'uppercase' }}
          onChange={(value: string | null) => handleChangeTab(value)}
          className='relative'
        >
          <NavLink
            label={isFormInTeam ? 'Back to Team Workspace' : 'Back to My Forms'}
            className='absolute left-10 top-[50%] w-max -translate-y-1/2 bg-transparent text-sm text-quarter-pearl-lusta-50 hover:bg-transparent'
            leftSection={<IoArrowBackOutline size={17} />}
            onClick={handleClickBackButton}
          />
          <MantineTabs.List className='h-[50px] justify-center gap-0 bg-gradient-to-r from-burnt-sienna-400 to-burnt-sienna-500'>
            {tabList.map((tab, index) => (
              <MantineTabs.Tab
                key={index}
                value={tab.value}
                className='h-full min-w-40 rounded-[0] px-8 text-lg text-quarter-pearl-lusta-50 duration-150 hover:bg-burnt-sienna-300'
              >
                {tab.title}
              </MantineTabs.Tab>
            ))}
          </MantineTabs.List>
          <ToggleButton
            label='Preview form'
            className='absolute right-10 top-[50%] -translate-y-1/2 text-sm text-quarter-pearl-lusta-50'
            isEnable={previewMode}
            handleToggleButton={handleClickPreviewButton}
          />
        </MantineTabs>
      )}
      <ConfirmationModal
        size={formId ? 'xl' : 'lg'}
        body={
          formId ? (
            <Box className='flex flex-col items-center gap-3 px-10'>
              <IoIosWarning className='size-28 text-red-500' />
              <Text size='lg' className='font-bold'>
                Unsaved Changes
              </Text>
              <Text className='text-center text-[15px]'>
                You have made changes that haven't been saved yet.
                <br />
                These changes will be lost if you leave the page without saving
                them.
                <br />
                Are you sure you want to discard changes?
              </Text>
            </Box>
          ) : (
            <Box className='flex flex-col items-center gap-3 px-10'>
              <IoIosWarning className='size-24 text-yellow-500' />
              <Text size='lg' className='font-bold'>
                Unsaved Form
              </Text>
              <Text className='text-center text-[15px]'>
                Your form hasn't been created yet. <br />
                Please make sure to save the form before leave this page.
              </Text>
            </Box>
          )
        }
        opened={opened}
        onClose={closeConfirmModal}
        onClickBack={closeConfirmModal}
        onClickConfirm={handleDiscardChanges}
        backButtonProps={{
          title: 'Keep editing',
          className: !formId ? 'hidden' : '',
        }}
        confirmButtonProps={{
          title: 'Discard changes',
          className: !formId ? 'hidden' : 'bg-red-500 hover:bg-red-600',
        }}
        isLoading={false}
      />
    </>
  );
};
