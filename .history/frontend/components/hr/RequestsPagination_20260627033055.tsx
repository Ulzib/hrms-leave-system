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

interface RequestsPaginationProps {
  currentPage: number; // Одоо байгаа хуудасны дугаар (жишээ нь: 1)
  totalPages: number; // Нийт хэдэн хуудас байгаа (жишээ нь: 3)
  startIndex: number; // Тухайн хуудасны өгөгдөл хэд дэх индексээс эхэлж байгаа (жишээ нь: 0)
  pageSize: number; // Нэг хуудсанд харуулах өгөгдлийн тоо (жишээ нь: 10)
  totalCount: number; // Нийт олдсон хүсэлтийн тоо (жишээ нь: 25)
  onPageChange: (page: number) => void; // Хуудас солигдох үед ажиллах функц
}
