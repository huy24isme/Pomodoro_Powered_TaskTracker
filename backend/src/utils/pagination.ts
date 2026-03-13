interface PaginationQuery {
  page?: string;
  limit?: string;
}

interface PaginationResult {
  skip: number;
  limit: number;
  page: number;
}

export const parsePagination = (query: PaginationQuery): PaginationResult => {
  const page = Math.max(1, parseInt(query.page || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(query.limit || "20", 10)));
  const skip = (page - 1) * limit;

  return { skip, limit, page };
};

export const paginationMeta = (page: number, limit: number, total: number) => ({
  page,
  limit,
  total,
  totalPages: Math.ceil(total / limit),
});
