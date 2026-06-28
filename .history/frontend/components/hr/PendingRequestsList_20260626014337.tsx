"use client";

import api from "@/lib/axios";
import { formatDistanceToNowStrict } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

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
        toast.error("Чөлөөний хүсэлтүүд татахад алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    };
    fetchReqs();
  }, []);

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

  return (
    <Card className="p-0 gap-0">
      <ScrollArea className="h-auto">
        <div className="flex flex-col">
          {filteredReqs.map((req) => {
            const timeAgo = formatDistanceToNowStrict(new Date(req.createdAt),);
            const initials = req.user.username.slice(0,2).toLowerCase()

            return(
                
            )
          })}
        </div>
      </ScrollArea>
    </Card>
  );
};
export default PendingRequestsList;
