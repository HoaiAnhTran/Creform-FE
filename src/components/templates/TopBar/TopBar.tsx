import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs as MantineTabs } from '@mantine/core';

import { ToggleButton } from '@/atoms/Button/ToggleButton';

export const TopBar = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [showPreviewForm, setShowPreviewForm] = useState<boolean>(false);

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
    setShowPreviewForm(!showPreviewForm);
  };
  return (
    <MantineTabs
      color='#8ad56c'
      variant='pills'
      defaultValue='/'
      classNames={{ tabLabel: 'uppercase' }}
      className='relative'
      onChange={(value) => handleChangeTab(value)}
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
        isEnable={showPreviewForm}
        handleToggleButton={handleClickPreviewForm}
      />
    </MantineTabs>
  );
};
