import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs as MantineTabs } from '@mantine/core';

import { ToggleButton } from '@/atoms/Button/ToggleButton';

export const Tabs = () => {
  const navigate = useNavigate();
  const { tabValue } = useParams();
  const [showPreviewForm, setShowPreviewForm] = useState<boolean>(false);

  const tabList = [
    { title: 'Build', value: '/' },
    { title: 'Publish', value: '/publish' },
  ];

  return (
    <MantineTabs
      color='#b4e8b1'
      variant='pills'
      defaultValue='/'
      classNames={{ tabLabel: 'uppercase' }}
      className='relative'
      value={tabValue}
      onChange={(value: string | null) => navigate(`${value}`)}
    >
      <MantineTabs.List className='justify-center gap-0 bg-gradient-to-r from-malachite-400 to-malachite-600'>
        {tabList.map((tab, index) => (
          <MantineTabs.Tab
            key={index}
            value={tab.value}
            className='h-full rounded-[0] px-8 text-lg text-white duration-150 hover:bg-activeTabBackground'
          >
            {tab.title}
          </MantineTabs.Tab>
        ))}
      </MantineTabs.List>
      <ToggleButton
        label='Preview Forms'
        className='absolute right-5 top-3 text-sm text-white'
        isEnable={showPreviewForm}
        handleToggleButton={() => setShowPreviewForm(!showPreviewForm)}
      />
      {
        // TODO: Implement routing for tab content
      }
    </MantineTabs>
  );
};
