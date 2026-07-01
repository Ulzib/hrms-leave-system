import { Badge } from "../ui/badge";
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
  if (status === "PENDING") return "bg-orange-600 text-orange-600";
  if (status === "APRROVED") return "bg-green-600 text-green-600";
  return "bg-red-600 text-red-600";
};

const RequestDetailPanel = ({
  request,
  onApprove,
  onReject,
}: DetailPanelProps) => {
  const isPending = request.status === "PENDING";
  return (
    <div className="flex flex-col gap-8 rounded-lg p-8 border bg-[#FFFFFF]">
      <div className="flex items-center justify-between">
        <Badge className={getStatusColor(request.status)}>
          {getStatusLabel(request.status)}
        </Badge>
      </div>
    </div>
  );
};
export default RequestDetailPanel;
