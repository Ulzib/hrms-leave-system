"use client";

import api from "@/lib/axios";
import { formatDistanceToNowStrict } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Calendar, TagIcon } from "lucide-react";
import { Badge } from "../ui/badge";

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

const getStatusLabel = (status: string) => {
  if (status === "PENDING") return "Хүлээгдэж байна";
  if (status === "APPROVED") return "Батлагдсан";
  return "Татгалзсан";
};

const getStatusColor = (status: string) => {
  if (status === "PENDING") return "bg-orange-100 text-orange-600";
  if (status === "APPROVED") return "bg-green-100 text-green-600";
  return "bg-red-100 text-red-600";
};

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
    <ScrollArea className="h-[560px]">
      <div className="flex flex-col gap-1">
        {filteredReqs.map((req) => {
          const timeAgo = formatDistanceToNowStrict(new Date(req.createdAt));
          //avatar-d ashiglah ehni useg
          const avatarInitials = req.user.username.slice(0, 2).toLowerCase();

          return (
            <button
              key={req.id}
              onClick={() => onSelect(req)}
              className={`flex items-start gap-3 p-4 text-left  rounded-md hover:bg-[#FFFFFF] transition-colors ${selectedId === req.id ? "bg-[#FFFFFF]" : ""}`}
            >
              <Avatar className="text-center">
                <AvatarImage src="/Avatar.png" alt={req.user.username} />
                <AvatarFallback>{avatarInitials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <div className="flex items-center gap-1.5 ">
                  <div className="text-sm font-medium leading-5 tracking-normal">
                    {req.user.username}
                  </div>
                  <p className="text-xs font-normal leading-4 tracking-normal">
                    {timeAgo}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-normal leading-4 tracking-normal truncate">
                  <TagIcon className="size-3" />
                  {req.requestType.name}({req.days} хоног)
                </div>
                <div className="flex items-center gap-1 text-xs font-normal leading-4 tracking-normal truncate">
                  <Calendar className="size-3" />
                  {new Date(req.startDate).toLocaleDateString("mn-MN")}
                </div>
              </div>
              <Badge className={getStatusColor(req.status)}>
                {getStatusLabel(req.status)}
              </Badge>
            </button>
          );
        })}
      </div>
    </ScrollArea>
  );
};
export default PendingRequestsList;
