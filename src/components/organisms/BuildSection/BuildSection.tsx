import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, LoadingOverlay } from '@mantine/core';
import _isEqual from 'lodash.isequal';

import { PATH } from '@/constants/routes';
import { useBuildFormContext } from '@/contexts';
import { SaveButton } from '@/molecules/SaveButton';
import { ScrollToTopButton } from '@/molecules/ScrollToTopButton';
import {
  useCreateFormMutation,
  useGetFormDetailsQuery,
  useUpdateFormMutation,
} from '@/redux/api/formApi';
import { useUploadImageMutation } from '@/redux/api/imageApi';
import { ElementType, ErrorResponse } from '@/types';
import { toastify } from '@/utils';
import { separateFields } from '@/utils/seperates';

import { BuildFormLeftbar } from '../BuildFormLeftbar';
import { FormContainer } from '../FormContainer';

const SHRINK_BUILD_FORM_LEFT_BAR = 0;
const STRETCH_BUILD_FORM_LEFT_BAR = 3;

const SHRINK_FORM_CONTAINER = 1;
const STRETCH_FORM_CONTAINER = 9;

export const BuildSection = () => {
  const { form, toggledLeftbar, isEditForm, toggledRightbar } =
    useBuildFormContext();

  const [currentElementType, setCurrentElementType] = useState<ElementType>();
  const [currentLogoFile, setCurrentLogoFile] = useState<File>();
  const [createForm, { isLoading: isCreatingForm }] = useCreateFormMutation();
  const [updateForm, { isLoading: isUpdatingForm }] = useUpdateFormMutation();
  const [uploadImage, { isLoading: isUploadingImage }] =
    useUploadImageMutation();
  const navigate = useNavigate();
  const { id: formId } = useParams();

  const { data: formData, isLoading: isLoadingGetFormDetails } =
    useGetFormDetailsQuery({ id: formId || '' }, { skip: !formId });

  const handleCreateForm = () => {
    const filteredForm = separateFields(form);
    if (currentLogoFile) {
      return uploadImage(currentLogoFile).then((imgRes) => {
        if ('data' in imgRes) {
          const logoUrl = imgRes.data.data.url;

          return createForm({
            ...filteredForm,
            logoUrl,
          }).then((res) => {
            if ('data' in res) {
              toastify.displaySuccess(res.data.message as string);
              return navigate(PATH.OVERVIEW_PAGE);
            }

            return toastify.displayError(
              (res.error as ErrorResponse).message as string,
            );
          });
        }

        return toastify.displayError((imgRes.error as ErrorResponse).message);
      });
    }
    return createForm(filteredForm).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        return navigate(PATH.OVERVIEW_PAGE);
      }
      return toastify.displayError(
        (res.error as ErrorResponse).message as string,
      );
    });
  };

  const handleUpdateForm = (formId: number) => {
    const filteredForm = separateFields(form);
    if (currentLogoFile) {
      return uploadImage(currentLogoFile).then((imgRes) => {
        if ('data' in imgRes) {
          const logoUrl = imgRes.data.data.url;

          return updateForm({
            id: formId,
            data: {
              ...filteredForm,
              logoUrl,
            },
          }).then((res) => {
            if ('data' in res) {
              toastify.displaySuccess(res.data.message as string);
              return;
            }

            return toastify.displayError(
              (res.error as ErrorResponse).message as string,
            );
          });
        }

        return toastify.displayError((imgRes.error as ErrorResponse).message);
      });
    }
    return updateForm({
      id: formId,
      data: filteredForm,
    }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message as string);
        return;
      }
      return toastify.displayError(
        (res.error as ErrorResponse).message as string,
      );
    });
  };

  return (
    <Box className='relative flex h-full w-full bg-malachite-50'>
      <Box
        flex={
          toggledLeftbar
            ? STRETCH_BUILD_FORM_LEFT_BAR
            : SHRINK_BUILD_FORM_LEFT_BAR
        }
        className='z-[100] transition-all duration-200 ease-linear'
      >
        <BuildFormLeftbar setCurrentElementType={setCurrentElementType} />
      </Box>
      <Box
        flex={toggledLeftbar ? STRETCH_FORM_CONTAINER : SHRINK_FORM_CONTAINER}
        className='transition-all duration-200 ease-linear'
      >
        <Box pos='relative'>
          <LoadingOverlay
            visible={isLoadingGetFormDetails}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'green' }}
          />
          <FormContainer
            isDisabled={isCreatingForm || isUpdatingForm}
            currentElementType={currentElementType!}
            setCurrentLogoFile={setCurrentLogoFile}
          />
        </Box>
      </Box>
      {toggledRightbar || (
        <SaveButton
          handleSave={() =>
            isEditForm ? handleUpdateForm(+formId!) : handleCreateForm()
          }
          isLoading={isCreatingForm || isUpdatingForm || isUploadingImage}
          canSave={!isEditForm || !_isEqual(formData, form)}
        />
      )}
      <ScrollToTopButton className='fixed bottom-14 right-10'></ScrollToTopButton>
    </Box>
  );
};
