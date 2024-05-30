import { useState } from 'react';
import { IoCloseOutline, IoEye, IoSearchOutline } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ActionIcon,
  Box,
  Grid,
  Group,
  Image,
  Overlay,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';

import { Button } from '@/atoms/Button';
import { PATH } from '@/constants';
import { Loader } from '@/molecules/Loader';
import { PreviewTemplateModal } from '@/molecules/PreviewTemplateModal';
import { Header } from '@/organisms/Header';
import { useGetAllTemplatesQuery } from '@/redux/api/templateApi';
import { GetAllTemplatesQueryParams, ModalType, ModalTypes } from '@/types';
import { cn } from '@/utils';

export const TemplatesPage = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');

  const [modalType, setModalType] = useState<ModalType | ''>('');
  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType('');

  const [params, setParams] = useState<GetAllTemplatesQueryParams>({});

  const [searchValue, setSearchValue] = useState<string>('');

  const { data: templates, isLoading: isLoadingTemplates } =
    useGetAllTemplatesQuery(params);

  const navigate = useNavigate();
  const location = useLocation();

  let teamId: string | undefined = undefined;
  let folderId: string | undefined = undefined;

  if (location.state) {
    teamId = location.state.teamId;
    folderId = location.state.folderId;
  }

  const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!value) {
      handleClearSearchInput();
      return;
    }
    setSearchValue(value);
  };

  const handleSearchTemplates = () => {
    setParams((prevState) => ({
      ...prevState,
      search: searchValue,
    }));
  };

  const handleClearSearchInput = () => {
    setSearchValue('');
    setParams((prevState) => ({
      ...prevState,
      search: '',
    }));
  };

  return (
    <Box className='flex h-screen flex-col justify-start gap-0'>
      <Header />

      <Stack className='w-full flex-1 items-center justify-start gap-9 bg-quarter-pearl-lusta-50 px-8 py-7'>
        <Stack className='w-max items-center justify-center gap-3'>
          <h2 className='font-semibold text-gray-800'>Choose a template</h2>
          <Text className='text-sm text-gray-800'>
            Use ready-made templates below to create a form or&nbsp;
            <span
              className='cursor-pointer text-ocean-green-500 no-underline hover:text-ocean-green-600 hover:no-underline'
              onClick={() =>
                navigate(PATH.BUILD_FORM_PAGE, {
                  state: {
                    folderId,
                    teamId,
                  },
                })
              }
            >
              start from scratch
            </span>
          </Text>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSearchTemplates();
            }}
            className='w-full'
          >
            <Group className='mt-2 w-full items-center justify-between gap-[6px]'>
              <TextInput
                value={searchValue}
                onChange={onChangeSearchInput}
                size='sm'
                placeholder='Search templates...'
                classNames={{
                  root: 'flex-1',
                  input:
                    'text-sm rounded-[4px] border-slate-300 focus:border-slate-400',
                }}
                rightSection={
                  <ActionIcon
                    variant='transparent'
                    size='sm'
                    onClick={handleClearSearchInput}
                    className={cn(
                      'invisible text-gray-600/90 hover:text-gray-700',
                      {
                        visible: searchValue,
                      },
                    )}
                  >
                    <IoCloseOutline size={18} />
                  </ActionIcon>
                }
              />
              <ActionIcon
                color='ocean-green.5'
                size={36}
                className='rounded-[4px]'
                type='button'
                onClick={handleSearchTemplates}
              >
                <IoSearchOutline size={18} />
              </ActionIcon>
            </Group>
          </form>
        </Stack>

        {isLoadingTemplates ? (
          <Loader />
        ) : templates && templates.length > 0 ? (
          <Grid
            gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}
            className='w-full px-5'
          >
            {templates?.map((template) => (
              <Grid.Col
                span={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                className='flex justify-center'
              >
                <Stack className='w-60 cursor-pointer items-center justify-between gap-3'>
                  <Box className='group relative flex size-60 flex-col items-center gap-2 rounded-md bg-slate-100 p-3 transition-all duration-100 ease-linear hover:scale-[105%] hover:shadow-templateShadow'>
                    <Image
                      src={template.thumbnailUrl}
                      className='flex-1 rounded-md object-cover'
                    />
                    <UnstyledButton
                      className='absolute left-1/2 top-1/2 z-20 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100/80 text-gray-800 opacity-0 transition-all delay-100 ease-in-out hover:bg-gray-100/95 group-hover:opacity-100'
                      onClick={() => {
                        setSelectedTemplateId(template.id);
                        openModal(ModalTypes.PREVIEW_TEMPLATE);
                      }}
                    >
                      <IoEye size={24} />
                    </UnstyledButton>
                    <Overlay
                      color='#000'
                      backgroundOpacity={0.15}
                      className='invisible z-10 transition-all duration-100 ease-linear group-hover:visible'
                    />
                  </Box>
                  <Text className='font-medium text-gray-800'>
                    {template.name}
                  </Text>
                  <Button
                    title='Use this template'
                    variant='outline'
                    className='w-full text-sm'
                    onClick={() => {
                      navigate(PATH.BUILD_FORM_PAGE, {
                        state: {
                          folderId,
                          teamId,
                          templateId: template.id,
                        },
                      });
                    }}
                  />
                </Stack>
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <Text className='text-sm text-gray-500'>No templates found.</Text>
        )}
      </Stack>

      <PreviewTemplateModal
        opened={modalType === ModalTypes.PREVIEW_TEMPLATE}
        onClose={closeModal}
        templateId={selectedTemplateId}
      />
    </Box>
  );
};
