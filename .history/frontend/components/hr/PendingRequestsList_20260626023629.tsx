"use client";

import api from "@/lib/axios";
import { formatDistanceToNowStrict } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
    <div className="flex flex-col gap-1-none">
      <ScrollArea className="h-[560px]">
        {filteredReqs.map((req) => {
          const timeAgo = formatDistanceToNowStrict(new Date(req.createdAt));
          //avatar-d ashiglah ehni useg
          const avatarInitials = req.user.username.slice(0, 2).toLowerCase();

          return (
            <button
              key={req.id}
              onClick={() => onSelect(req)}
              className={`flex items-start gap-3 py-4 text-left border rounded-md hover:bg-muted/50 transition-colors ${selectedId === req.id ? "bg-muted" : ""}`}
            >
              <Avatar>
                <AvatarImage src="/Avatar.png" alt={req.user.username} />
                <AvatarFallback>{avatarInitials}</AvatarFallback>
              </Avatar>
              <div>{req.user.username}</div>
            </button>
          );
        })}
      </ScrollArea>
    </div>
  );
};
export default PendingRequestsList;
