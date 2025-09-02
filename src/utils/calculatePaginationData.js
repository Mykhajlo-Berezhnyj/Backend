export const calculatePaginationData = (count, perPage, page) => {
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = totalPages - page > 0;
  const hasPreviousPage = page !== 1;

  return {
    page,
    perPage,
    totalPages,
    totalItems: count,
    hasPreviousPage,
    hasNextPage,
  };
};
