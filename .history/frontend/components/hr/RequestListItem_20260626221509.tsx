import { formatDistanceToNowStrict } from "date-fns";
import { LeaveRequestItem } from "./PendingRequestsList";

interface RequestListItemProps {
  request: LeaveRequestItem;
  isSelected: boolean;
  isUnread: boolean;
  onClick: () => void;
}

const RequestListItem = ({
  request,
  isSelected,
  isUnread,
  onClick,
}: RequestListItemProps) => {
  const timeAgo = formatDistanceToNowStrict(new Date(req.createdAt));
  //avatar-d ashiglah ehni useg
  const avatarInitials = req.user.username.slice(0, 2).toLowerCase();

  return (
    <button
      key={req.id}
      onClick={() => onSelect(req)}
      className={`relative flex items-center gap-3 p-4 text-left  rounded-md hover:bg-[#FFFFFF] transition-colors ${selectedId === req.id ? "bg-[#FFFFFF] border" : ""}`}
    >
      <Avatar className="size-12">
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
      <Badge
        className={`absolute top-4.5 right-4  ${getStatusColor(req.status)}`}
      >
        {getStatusLabel(req.status)}
      </Badge>
    </button>
  );
};
export default RequestListItem;
