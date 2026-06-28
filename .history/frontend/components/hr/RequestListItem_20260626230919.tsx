"use client";

import { formatDistanceToNowStrict } from "date-fns";
import { LeaveRequestItem } from "./PendingRequestsList";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge, Calendar, TagIcon } from "lucide-react";

interface RequestListItemProps {
  request: LeaveRequestItem;
  isSelected: boolean;
  isUnread: boolean;
  onClick: () => void;
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

const RequestListItem = ({
  request,
  isSelected,
  isUnread,
  onClick,
}: RequestListItemProps) => {
  const timeAgo = formatDistanceToNowStrict(new Date(request.createdAt));
  //avatar-d ashiglah ehni useg
  const avatarInitials = request.user.username.slice(0, 2).toLowerCase();

  const timeTextColor = isUnread
    ? "text-blue-600 font-medium"
    : "text-muted-foreground";
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-3 p-4 text-left  rounded-md hover:bg-[#FFFFFF] transition-colors ${isSelected ? "bg-[#FFFFFF] border" : ""}`}
    >
      <Avatar className="size-12">
        <AvatarImage src="/Avatar.png" alt={request.user.username} />
        <AvatarFallback>{avatarInitials}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="flex items-center gap-1.5 ">
          <div className="text-sm font-medium leading-5 tracking-normal">
            {request.user.username}
          </div>
          <p className="text-xs font-normal leading-4 tracking-normal">
            {timeAgo}
          </p>
          {isUnread && (
            <span className="size-2 rounded-full bg-blue-600 shrink-0"></span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs font-normal leading-4 tracking-normal truncate">
          <TagIcon className="size-3" />
          {request.requestType.name}({request.days} хоног)
        </div>
        <div className="flex items-center gap-1 text-xs font-normal leading-4 tracking-normal truncate">
          <Calendar className="size-3" />
          {new Date(request.startDate).toLocaleDateString("mn-MN")}
        </div>
      </div>
      <Badge
        className={`absolute top-4.5 right-4  ${getStatusColor(req.status)}`}
      >
        {getStatusLabel(request.status)}
      </Badge>
    </button>
  );
};
export default RequestListItem;
