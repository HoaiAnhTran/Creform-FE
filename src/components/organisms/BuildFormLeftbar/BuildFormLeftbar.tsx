import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { Box, Divider, Group, Stack, Text } from '@mantine/core';

import { Button } from '@/atoms/Button';
import { ElementList } from '@/configs';
import { cn } from '@/utils';

const elementList = ElementList;

export const BuildFormLeftbar = () => {
  const [showLeftbar, setShowLeftbar] = useState(false);

  return (
    <Box>
      <Button
        onClick={() => {
          setShowLeftbar(true);
        }}
        className={cn(
          'mt-10 h-14 w-[0] rounded-l-none rounded-r-full pr-0 transition-all duration-1000 ease-linear',
          { 'w-[170px]': !showLeftbar },
        )}
        size='sm'
        title='Add form elements'
        color='gray'
        rightSection={
          <Box className='relative flex h-12 w-12'>
            <Box className='absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-600 opacity-75'></Box>
            <Box className='relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-400'>
              <FaPlus className='flex' />
            </Box>
          </Box>
        }
        classNames={{ label: '!whitespace-normal w-[100px]', inner: 'pr-[0]' }}
      />
      <Box
        className={cn(
          'absolute top-0 h-screen w-[0] overflow-auto bg-slate-500 transition-all duration-1000 ease-linear',
          { 'w-[350px]': showLeftbar },
        )}
      >
        <IoMdClose
          className='absolute right-2 top-2 size-6 cursor-pointer text-white'
          onClick={() => {
            setShowLeftbar(false);
          }}
        />
        <Box>
          <Stack className='gap-0'>
            <Box className='flex p-3 text-white'>
              <Text size='lg'>Form Elements</Text>
            </Box>
            <Divider color='gray' />
            {elementList.map((elementType, index) => (
              <Stack key={index} className='gap-0'>
                <Box className='flex justify-center bg-slate-600 p-2 uppercase text-slate-300'>
                  <Text className='text-[13px]'>{elementType.title}</Text>
                </Box>
                <Divider color='gray' />
                <Box>
                  {elementType.elements.map(({ element, id }) => (
                    <Box key={id}>
                      <Group className='group cursor-move hover:bg-malachite-500'>
                        <Box className='flex bg-slate-600 p-3 text-white group-hover:bg-malachite-400'>
                          <element.icon size={25} />
                        </Box>
                        <Box className='text-white'>{element.type}</Box>
                      </Group>
                      <Divider color='gray' />
                    </Box>
                  ))}
                </Box>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
