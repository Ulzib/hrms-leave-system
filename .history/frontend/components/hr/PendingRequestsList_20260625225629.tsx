"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";

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
  const [request, setRequest] = useState<LeaveRequestItem[]>([]);
  return <div>hi</div>;
};
export default PendingRequestsList;
