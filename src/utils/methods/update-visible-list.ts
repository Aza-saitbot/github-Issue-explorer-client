import { Dispatch, SetStateAction } from 'react';

const calculateVisibleItems = <T>(page: number, items: T[]) => {
  const countItemsPerPage = 30;
  const startIndex = (page - 1) * countItemsPerPage;
  const endIndex = startIndex + countItemsPerPage;

  return items.slice(startIndex, endIndex);
};

export const updateVisibleList = <T>(list: T[], page: number, setVisibleItems: Dispatch<SetStateAction<T[]>>) => {
  const newVisibleItems = calculateVisibleItems(page, list);

  if (page === 1) {
    setVisibleItems(newVisibleItems);
  } else {
    setVisibleItems((prevVisibleItems) => prevVisibleItems.concat(newVisibleItems));
  }
};
