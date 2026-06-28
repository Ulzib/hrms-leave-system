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
  return <div></div>;
};
export default RequestListItem;
