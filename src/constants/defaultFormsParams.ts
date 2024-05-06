import { GetFormsParams } from '@/types';

import { DEFAULT_SORT_OPTION_INDEX, SORT_OPTION_LIST } from './sortOptions';

export const DEFAULT_PAGE_SIZE = 10;

export const defaultFormsParams: GetFormsParams = {
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  sortField: SORT_OPTION_LIST[DEFAULT_SORT_OPTION_INDEX].field,
  sortDirection: SORT_OPTION_LIST[DEFAULT_SORT_OPTION_INDEX].sortDirection,
  isDeleted: 0,
  isFavourite: 0,
  search: '',
  folderId: undefined,
  teamId: undefined,
};
