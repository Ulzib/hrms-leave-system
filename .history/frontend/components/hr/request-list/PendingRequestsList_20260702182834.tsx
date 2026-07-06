"use client";

import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { Card } from "../../ui/card";
import { ScrollArea } from "../../ui/scroll-area";

import RequestListItem from "./RequestListItem";
import RequestPagination from "../request-list/RequestsPagination";

export interface LeaveRequestItem {
  id: number;
  days: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  reason: string;
  rejectReason: string | null;
  user: { id: number; username: string; email: string };
  requestType: { name: string };
}

interface PendingRequestListProps {
  search: string;
  selectedDate: DateRange | undefined;
  selectedStatuses: StatusValue[];
  onCountsChange: (counts: StatusCounts) => void;
  selectedId: number | null;
  onSelect: (request: LeaveRequestItem) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  refreshKey: number;
}
const PAGE_SIZE = 10;
const READ_REQ_IDS_KEY = "hr-read-request-ids";
const PendingRequestsList = ({
  search,
  selectedDate,
  selectedStatuses,
  onCountsChange,
  selectedId,
  onSelect,
  currentPage,
  onPageChange,
  refreshKey,
}: PendingRequestListProps) => {
  const [requests, setRequests] = useState<LeaveRequestItem[]>([]);
  const [readReqIds, setReadReqIds] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(READ_REQ_IDS_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  }); //click neej uzsen req id-g end savelene
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReqs = async () => {
      try {
        setLoading(true);
        const res = await api.get("/leave/all-requests");
        setRequests(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Чөлөөний хүсэлтүүд татахад алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    };
    fetchReqs();
  }, [refreshKey]);

  //search, selectedDate uurchlugduuh burd 1-r huudas ru butsaana
  const filterKey = `${search}|${selectedDate?.from}|${selectedDate?.to}`;

  //Nereer haih, ognooni limiteer shuuh
  let filteredReqs = requests.filter((req) =>
    req.user.username.toLowerCase().includes(search.toLowerCase()),
  );

  if (selectedDate?.from) {
    const from = selectedDate.from;
    const to = selectedDate.to ?? from;
    filteredReqs = filteredReqs.filter((req) => {
      const date = new Date(req.startDate);
      return date >= from && date <= to;
    });
  }

  const totalCount = filteredReqs.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  useEffect(() => {
    if (currentPage > totalPages) {
      onPageChange(totalPages);
    }
  }, [totalPages, currentPage, onPageChange]);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const requestToShow = filteredReqs.slice(startIndex, endIndex);

  const handleSelectReq = (request: LeaveRequestItem) => {
    const alreadyRead = readReqIds.includes(request.id);
    if (!alreadyRead) {
      const updateIds = [...readReqIds, request.id];
      setReadReqIds(updateIds);
      //refreshed blsn array-a local-d savelene
      localStorage.setItem(READ_REQ_IDS_KEY, JSON.stringify(updateIds));
    }
    onSelect(request);
  };

  if (totalCount === 0) {
    return (
      <Card className="flex items-center justify-center py-10 px-4">
        <p className="text-sm text-muted-foreground">Хүсэлт олдсонгүй</p>
      </Card>
    );
  }

  return (
    <>
      <ScrollArea className="h-140">
        <div className="flex flex-col gap-1">
          {requestToShow.map((req) => {
            return (
              <RequestListItem
                key={req.id}
                request={req}
                isSelected={selectedId === req.id}
                isUnread={!readReqIds.includes(req.id)}
                onClick={() => handleSelectReq(req)}
              />
            );
          })}
        </div>
      </ScrollArea>
      <RequestPagination
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        pageSize={PAGE_SIZE}
        totalCount={totalCount}
        onPageChange={onPageChange}
      />
    </>
  );
};
export default PendingRequestsList;
