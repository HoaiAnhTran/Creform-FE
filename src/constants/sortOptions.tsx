import { ReactNode } from 'react';
import { FaArrowDownShortWide } from 'react-icons/fa6';
import { FaArrowUpShortWide } from 'react-icons/fa6';

export interface SortOption {
  field: string;
  sortDirection: string;
  title: string;
  icon: ReactNode;
}

export enum SORT_DIRECTION {
  ASC = 'asc',
  DESC = 'desc',
}

export const DEFAULT_SORT_OPTION_INDEX = 3;

export const SORT_OPTION_LIST: SortOption[] = [
  {
    field: 'title',
    sortDirection: SORT_DIRECTION.ASC,
    title: 'Title',
    icon: <FaArrowUpShortWide />,
  },
  {
    field: 'title',
    sortDirection: SORT_DIRECTION.DESC,
    title: 'Title',
    icon: <FaArrowDownShortWide />,
  },
  {
    field: 'createdAt',
    sortDirection: SORT_DIRECTION.ASC,
    title: 'Date created',
    icon: <FaArrowUpShortWide />,
  },
  {
    field: 'createdAt',
    sortDirection: SORT_DIRECTION.DESC,
    title: 'Date created',
    icon: <FaArrowDownShortWide />,
  },
  {
    field: 'updatedAt',
    sortDirection: SORT_DIRECTION.ASC,
    title: 'Last edit',
    icon: <FaArrowUpShortWide />,
  },
  {
    field: 'updatedAt',
    sortDirection: SORT_DIRECTION.DESC,
    title: 'Last edit',
    icon: <FaArrowDownShortWide />,
  },
];
