"use client";

import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

export interface LeaveRequestItem {
  id: number;
  days: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  rejectReason: string | null;
  user: { id: number; username: string; email: string };
  requestType: { name: string };
}

interface PendingRequestListProps {
  search: string;
  selectedDate: DateRange | undefined;
  selectedId: number | null;
  onSelect: (request: LeaveRequestItem) => void;
}

const PendingRequestsList = ({
  search,
  selectedDate,
  selectedId,
  onSelect,
}: PendingRequestListProps) => {
  const [requests, setRequests] = useState<LeaveRequestItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReqs = async () => {
      try {
        setLoading(true);
        const res = await api.get("leave/all-request");
        setRequests(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Чөлөөний хүсэлтүүд татахад алдаа гарлаа", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReqs();
  }, []);
  return <div>hi</div>;
};
export default PendingRequestsList;
