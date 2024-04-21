import { LuExternalLink } from 'react-icons/lu';
import { useLocation, useNavigate } from 'react-router-dom';
import { ActionIcon, Box, Group, Tabs as MantineTabs } from '@mantine/core';

import { ToggleButton } from '@/atoms/Button/ToggleButton';
import { useBuildFormContext } from '@/contexts';

export const TopBar = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const { form, isEditForm, previewMode, setPreviewMode } =
    useBuildFormContext();

  const formURL = isEditForm ? `${window.location.origin}/form/${form.id}` : '';

  const tabList = [
    { title: 'Build', value: '/' },
    { title: 'Publish', value: 'publish' },
  ];

  const handleChangeTab = (value: string | null) => {
    if (value === 'publish' && !pathname.includes('publish')) {
      navigate(pathname.concat(`/${value}`));
    } else if (value !== 'publish' && pathname.includes('publish')) {
      navigate(pathname.replace('/publish', ''));
    }
  };

  const handleClickPreviewForm = () => {
    setPreviewMode((prevState) => !prevState);
    previewMode
      ? navigate(pathname.replace('/preview', ''))
      : navigate(pathname.concat('/preview'));
  };

  return previewMode ? (
    <Box className='relative flex h-[50px] items-center justify-start gap-0 bg-gradient-to-r from-malachite-400 to-malachite-600 pl-10'>
      <Group className='max-w-[300px] flex-1 items-center justify-between gap-0'>
        <input
          value={formURL}
          className='h-[28px] flex-1 rounded-l-[4px] border-none px-3 py-[5px] text-xs outline-none'
          readOnly
        />
        <ActionIcon
          component='button'
          aria-label='Open in a new tab'
          onClick={() => {
            window.open(formURL, '_blank');
          }}
          className='rounded-l-none rounded-r-[4px]'
          disabled={!isEditForm}
        >
          <LuExternalLink />
        </ActionIcon>
      </Group>
      <ToggleButton
        label='Preview form'
        className='absolute right-10 top-[50%] -translate-y-1/2 text-sm text-white'
        isEnable={previewMode}
        handleToggleButton={handleClickPreviewForm}
      />
    </Box>
  ) : (
    <MantineTabs
      color='#8ad56c'
      variant='pills'
      defaultValue={
        pathname.includes('publish') ? tabList[1].value : tabList[0].value
      }
      classNames={{ tabLabel: 'uppercase' }}
      onChange={(value) => handleChangeTab(value)}
      className='relative'
    >
      <MantineTabs.List className='h-[50px] justify-center gap-0 bg-gradient-to-r from-malachite-400 to-malachite-600'>
        {tabList.map((tab, index) => (
          <MantineTabs.Tab
            key={index}
            value={tab.value}
            className='h-full min-w-40 rounded-[0] px-8 text-lg text-white duration-150 hover:bg-activeTabBackground'
          >
            {tab.title}
          </MantineTabs.Tab>
        ))}
      </MantineTabs.List>
      <ToggleButton
        label='Preview form'
        className='absolute right-10 top-[50%] -translate-y-1/2 text-sm text-white'
        isEnable={previewMode}
        handleToggleButton={handleClickPreviewForm}
      />
    </MantineTabs>
  );
};
