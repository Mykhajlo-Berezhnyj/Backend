export const calculatePaginationData = (count, page, perPage) => {
  const totalPages = Math.ceil(count / perPage) || 0;
  const hasPreviousPage = page > 1 && totalPages > 0;
  const hasNextPage = page < totalPages;

  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};