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
  if (status === "PENDING") return "bg-orange-100 text-orange-600";
  if (status === "APRROVED") return "bg-green-100 text-green-600";
  return "bg-red-100 text-red-600";
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
        <div className="flex flex-col gap-2">
          <Badge className={getStatusColor(request.status)}>
            {getStatusLabel(request.status)}
          </Badge>
          <h4 className="text-xl font-semibold leading-7 tracking-[-2.5%]">
            {request.user.username}
          </h4>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium leading-5 tracking-normal text-muted-foreground">
            Хүсэлт явуулсан огноо:
          </p>
          <p className="text-sm font-normal leading-[100%] tracking-normal">
            {new Date(request.createdAt).toLocaleString("mn-MN")}
          </p>
        </div>
      </div>
      {/* angilal, ognoo, tsag, niit grid 4 talbar */}
      <div className="grid grid-cols-4 gap-4">
        <div className=""></div>
      </div>
    </div>
  );
};
export default RequestDetailPanel;
