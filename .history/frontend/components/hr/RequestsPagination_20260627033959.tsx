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
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t">
      {" "}
      <p className="text-xs text-muted-foreground">
        {startIndex + 1}-{endIndex}хүсэлт(Нийт: {totalCount})
      </p>
    </div>
  );
};
export default RequestPagination;
