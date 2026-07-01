import { LeaveRequestItem } from "./PendingRequestsList";

interface DetailPanelProps {
  request: LeaveRequestItem;
  onApprove: () => void;
  onReject: () => void;
}

const getStatusLabel = (status: string) => {
  if (status === "PENDING") return "Хүлээгдэж байна";
  if (status === "APPROVED") return "Батлагдсан";
  return "Татгалзсан";
};

const getStatusColor = (status: string) => {
  if (status === "PENDING") return "bg-orange-600 ";
};

const RequestDetailPanel = ({
  request,
  onApprove,
  onReject,
}: DetailPanelProps) => {
  return <div>hi</div>;
};
export default RequestDetailPanel;
