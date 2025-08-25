export const calculatePaginationData = (count, perPage, page) => {
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = Boolean(totalPages - page);
  const hasPreviousPage = page !== 1;

  return {
    page: safePage,
    perPage: safePerPage,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};