export type ApiMeta = {
  isFirstPage?: boolean;
  isLastPage?: boolean;
  currentPage?: number;
  previousPage?: number | null;
  nextPage?: number | null;
  pageCount?: number;
  totalCount?: number;
};

export type ApiResponse<T> = {
  data: T;
  meta: ApiMeta;
};
