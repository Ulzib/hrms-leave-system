"use client";

interface RequestPaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

const RequestPagination = ({
  currentPage,
  totalPages,
  startIndex,
  pageSize,
  totalCount,
  onPageChange,
}: RequestPaginationProps) => {
  const endIndex = Math.min(startIndex + pageSize, totalCount);
  return <div></div>;
};
export default RequestPagination;
