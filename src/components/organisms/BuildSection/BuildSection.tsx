import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mantine/core';
import { Form, Formik } from 'formik';
import _isEqual from 'lodash.isequal';

import { PATH } from '@/constants/routes';
import { useBuildFormContext } from '@/contexts';
import { SaveButton } from '@/molecules/SaveButton';
import { ScrollToTopButton } from '@/molecules/ScrollToTopButton';
import {
  useCreateFormInFolderMutation,
  useCreateFormInFolderOfTeamMutation,
  useCreateFormInTeamMutation,
  useCreateFormMutation,
  useGetFormDetailsQuery,
  useUpdateFormMutation,
} from '@/redux/api/formApi';
import { useUploadImageMutation } from '@/redux/api/uploadApi';
import { ElementType, ErrorResponse } from '@/types';
import { removeTextFromFieldOfElement, toastify } from '@/utils';

import { BuildFormLeftbar } from '../BuildFormLeftbar';
import { FormContainer } from '../FormContainer';

const SHRINK_BUILD_FORM_LEFT_BAR = 0;
const STRETCH_BUILD_FORM_LEFT_BAR = 3;

const SHRINK_FORM_CONTAINER = 1;
const STRETCH_FORM_CONTAINER = 9;

export const BuildSection = () => {
  const { form, toggledLeftbar, isEditForm, toggledRightbar, currentLogoFile } =
    useBuildFormContext();

  const navigate = useNavigate();

  const { id: formId } = useParams();

  const location = useLocation();
  let teamId: string;
  let folderId: string;

  if (!isEditForm && location.state) {
    teamId = location.state.teamId;
    folderId = location.state.folderId;
  }

  const [currentElementType, setCurrentElementType] = useState<ElementType>();

  const [createForm, { isLoading: isCreatingForm }] = useCreateFormMutation();
  const [createFormInFolder, { isLoading: isCreatingFormInFolder }] =
    useCreateFormInFolderMutation();
  const [createFormInTeam, { isLoading: isCreatingFormInTeam }] =
    useCreateFormInTeamMutation();
  const [
    createFormInFolderOfTeam,
    { isLoading: isCreatingFormInFolderOfTeam },
  ] = useCreateFormInFolderOfTeamMutation();
  const [updateForm, { isLoading: isUpdatingForm }] = useUpdateFormMutation();
  const [uploadImage, { isLoading: isUploadingImage }] =
    useUploadImageMutation();

  const { data: formData, isLoading: isLoadingGetFormDetails } =
    useGetFormDetailsQuery({ id: formId || '' }, { skip: !formId });

  const handleCreateForm = () => {
    const filteredForm = removeTextFromFieldOfElement(form);
    if (currentLogoFile) {
      return uploadImage(currentLogoFile).then((imgRes) => {
        if ('data' in imgRes) {
          const logoUrl = imgRes.data.data.url;

          return createForm({
            ...filteredForm,
            logoUrl,
          }).then((res) => {
            if ('data' in res) {
              toastify.displaySuccess(res.data.message);
              return navigate(`${PATH.BUILD_FORM_PAGE}/${res.data.data.id}`);
            }
            return toastify.displayError((res.error as ErrorResponse).message);
          });
        }
        return toastify.displayError((imgRes.error as ErrorResponse).message);
      });
    }

    return createForm(filteredForm).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message);
        return navigate(`${PATH.BUILD_FORM_PAGE}/${res.data.data.id}`);
      }
      return toastify.displayError((res.error as ErrorResponse).message);
    });
  };

  const handleCreateFormInFolder = (folderId: string) => {
    const filteredForm = removeTextFromFieldOfElement(form);
    if (currentLogoFile) {
      return uploadImage(currentLogoFile).then((imgRes) => {
        if ('data' in imgRes) {
          const logoUrl = imgRes.data.data.url;

          return createFormInFolder({
            folderId,
            data: {
              ...filteredForm,
              logoUrl,
            },
          }).then((res) => {
            if ('data' in res) {
              toastify.displaySuccess(res.data.message);
              return navigate(`${PATH.BUILD_FORM_PAGE}/${res.data.data.id}`);
            }
            return toastify.displayError((res.error as ErrorResponse).message);
          });
        }
        return toastify.displayError((imgRes.error as ErrorResponse).message);
      });
    }

    return createFormInFolder({ folderId, data: filteredForm }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message);
        return navigate(`${PATH.BUILD_FORM_PAGE}/${res.data.data.id}`);
      }
      return toastify.displayError((res.error as ErrorResponse).message);
    });
  };

  const handleCreateFormInTeam = (teamId: string) => {
    const filteredForm = removeTextFromFieldOfElement(form);
    if (currentLogoFile) {
      return uploadImage(currentLogoFile).then((imgRes) => {
        if ('data' in imgRes) {
          const logoUrl = imgRes.data.data.url;

          return createFormInTeam({
            teamId,
            data: {
              ...filteredForm,
              logoUrl,
            },
          }).then((res) => {
            if ('data' in res) {
              toastify.displaySuccess(res.data.message);
              return navigate(`${PATH.BUILD_FORM_PAGE}/${res.data.data.id}`);
            }
            return toastify.displayError((res.error as ErrorResponse).message);
          });
        }
        return toastify.displayError((imgRes.error as ErrorResponse).message);
      });
    }

    return createFormInTeam({ teamId, data: filteredForm }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message);
        return navigate(`${PATH.BUILD_FORM_PAGE}/${res.data.data.id}`);
      }
      return toastify.displayError((res.error as ErrorResponse).message);
    });
  };

  const handleCreateFormInFolderOfTeam = (folderId: string, teamId: string) => {
    const filteredForm = removeTextFromFieldOfElement(form);
    if (currentLogoFile) {
      return uploadImage(currentLogoFile).then((imgRes) => {
        if ('data' in imgRes) {
          const logoUrl = imgRes.data.data.url;

          return createFormInFolderOfTeam({
            folderId,
            teamId,
            data: {
              ...filteredForm,
              logoUrl,
            },
          }).then((res) => {
            if ('data' in res) {
              toastify.displaySuccess(res.data.message);
              return navigate(`${PATH.BUILD_FORM_PAGE}/${res.data.data.id}`);
            }
            return toastify.displayError((res.error as ErrorResponse).message);
          });
        }
        return toastify.displayError((imgRes.error as ErrorResponse).message);
      });
    }

    return createFormInFolderOfTeam({
      folderId,
      teamId,
      data: filteredForm,
    }).then((res) => {
      if ('data' in res) {
        toastify.displaySuccess(res.data.message);
        return navigate(`${PATH.BUILD_FORM_PAGE}/${res.data.data.id}`);
      }
      return toastify.displayError((res.error as ErrorResponse).message);
    });
  };

  const handleCreateFormBasedOnIds = () => {
    if (folderId === undefined && teamId === undefined) {
      return handleCreateForm();
    }
    if (teamId === undefined) {
      return handleCreateFormInFolder(folderId);
    }
    if (folderId === undefined) {
      return handleCreateFormInTeam(teamId);
    }
    return handleCreateFormInFolderOfTeam(folderId, teamId);
  };

  const handleUpdateForm = (formId: string) => {
    const filteredForm = removeTextFromFieldOfElement(form);
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
              toastify.displaySuccess(res.data.message);
              return;
            }

            return toastify.displayError((res.error as ErrorResponse).message);
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
        toastify.displaySuccess(res.data.message);
        return;
      }
      return toastify.displayError((res.error as ErrorResponse).message);
    });
  };

  return (
    <Formik
      initialValues={{}}
      validateOnBlur={true}
      validateOnChange={false}
      onSubmit={() => {
        isEditForm ? handleUpdateForm(formId!) : handleCreateFormBasedOnIds();
      }}
    >
      <Form className='h-full w-full'>
        <Box className='relative flex h-full w-full bg-quarter-pearl-lusta-50'>
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
            flex={
              toggledLeftbar ? STRETCH_FORM_CONTAINER : SHRINK_FORM_CONTAINER
            }
            className='transition-all duration-200 ease-linear'
          >
            <FormContainer
              isLoading={
                isLoadingGetFormDetails ||
                isCreatingForm ||
                isCreatingFormInFolder ||
                isCreatingFormInTeam ||
                isCreatingFormInFolderOfTeam ||
                isUpdatingForm ||
                isUploadingImage
              }
              isDisabled={
                isCreatingForm ||
                isCreatingFormInFolder ||
                isCreatingFormInFolderOfTeam ||
                isUpdatingForm
              }
              currentElementType={currentElementType!}
            />
            {toggledRightbar || (
              <SaveButton
                isLoading={
                  isCreatingForm ||
                  isCreatingFormInFolder ||
                  isCreatingFormInFolderOfTeam ||
                  isUpdatingForm ||
                  isUploadingImage
                }
                canSave={
                  !isEditForm ||
                  !_isEqual(formData, removeTextFromFieldOfElement(form))
                }
              />
            )}
            <ScrollToTopButton className='fixed bottom-14 right-10' />
          </Box>
        </Box>
      </Form>
    </Formik>
  );
};
