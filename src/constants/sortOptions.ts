export interface SortOption {
  field: string;
  sortDirection: string;
  title: string;
}

export const sortOptionList: SortOption[] = [
  {
    field: 'title',
    sortDirection: 'asc',
    title: 'Title [A-Z]',
  },
  {
    field: 'title',
    sortDirection: 'desc',
    title: 'Title [Z-A]',
  },
  {
    field: 'createdAt',
    sortDirection: 'asc',
    title: 'Date created [ASC]',
  },
  {
    field: 'createdAt',
    sortDirection: 'desc',
    title: 'Date created [DESC]',
  },
  {
    field: 'updatedAt',
    sortDirection: 'asc',
    title: 'Last edit [ASC]',
  },
  {
    field: 'updatedAt',
    sortDirection: 'desc',
    title: 'Last edit [DESC]',
  },
];
