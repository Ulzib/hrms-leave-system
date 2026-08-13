"use client";

import api from "@/lib/axios";
import { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { Card } from "../../ui/card";
import { ScrollArea } from "../../ui/scroll-area";
import RequestListItem from "./RequestListItem";
import RequestPagination from "../request-list/RequestsPagination";
import {
  StatusCounts,
  StatusValue,
  useReadRequestIds,
} from "./StatusFilterDropDown";
import PendingReqListSkeleton from "./PendingReqListSkeleton";
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
  onLoadingChange: (loading: boolean) => void;
}
const PAGE_SIZE = 10;
const PendingRequestsList = ({
  search,
  selectedDate,
  selectedStatuses = [],
  onCountsChange,
  selectedId,
  onSelect,
  currentPage,
  onPageChange,
  refreshKey,
  onLoadingChange,
}: PendingRequestListProps) => {
  const [requests, setRequests] = useState<LeaveRequestItem[]>([]);
  const { readIds, markRead } = useReadRequestIds();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReqs = async () => {
      try {
        setLoading(true);
        onLoadingChange(true);
        const res = await api.get("/leave/all-requests");
        setRequests(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Чөлөөний хүсэлтүүд татахад алдаа гарлаа");
      } finally {
        setLoading(false);
        onLoadingChange(false);
      }
    };
    fetchReqs();
  }, [refreshKey, onLoadingChange]);
  //Nereer haih, ognooni limiteer shuuh
  const searchFilterReqs = useMemo(
    () =>
      requests.filter((req) =>
        req.user.username.toLowerCase().includes(search.toLowerCase()),
      ),
    [requests, search],
  );

  const dateFilterReqs = useMemo(() => {
    if (!selectedDate?.from) return searchFilterReqs;
    const from = selectedDate.from;
    const to = selectedDate.to ? selectedDate.to : from;
    return searchFilterReqs.filter((req) => {
      const date = new Date(req.startDate);
      return date >= from && date <= to;
    });
  }, [searchFilterReqs, selectedDate]);

  //type tus buriin too hdn bhiig tootsoloh
  useEffect(() => {
    let approvedCount = 0;
    let pendingCount = 0;
    let rejectedCount = 0;
    for (let i = 0; i < dateFilterReqs.length; i++) {
      if (dateFilterReqs[i].status === "APPROVED") approvedCount++;
      if (dateFilterReqs[i].status === "PENDING") pendingCount++;
      if (dateFilterReqs[i].status === "REJECTED") rejectedCount++;
    }
    onCountsChange({
      APPROVED: approvedCount,
      PENDING: pendingCount,
      REJECTED: rejectedCount,
    });
  }, [dateFilterReqs, onCountsChange]);
  //statusaar shuuh
  const filteredReqs = useMemo(() => {
    if (selectedStatuses.length === 0) return dateFilterReqs;
    return dateFilterReqs.filter((req) =>
      selectedStatuses.includes(req.status),
    );
  }, [dateFilterReqs, selectedStatuses]);
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
    markRead(request.id);
    onSelect(request);
  };
  if (loading) return <PendingReqListSkeleton />;
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
                isUnread={!readIds.includes(req.id)}
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
