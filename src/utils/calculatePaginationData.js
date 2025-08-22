export const calculatePaginationData = (count, page, perPage) => {
  const totalItems = Number(count) || 0;
  const safePerPage = Math.max(1, Number(perPage) || 1);

  const totalPages = totalItems === 0 ? 0 : Math.ceil(totalItems / safePerPage);

  const safePage = totalPages === 0 ? 1 : Math.min(Math.max(1, Number(page) || 1), totalPages);

  const hasPreviousPage = safePage > 1;
  const hasNextPage = totalPages > 0 && safePage < totalPages;

  return {
    page: safePage,
    perPage: safePerPage,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};