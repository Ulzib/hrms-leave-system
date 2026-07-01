import { Calendar, Check, TagIcon, TimerIcon, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { LeaveRequestItem } from "./PendingRequestsList";
import { Button } from "../ui/button";

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
      <div className="flex justify-between gap-4">
        <div className="w-full flex flex-col items-start gap-2">
          <div className="flex gap-2">
            <TagIcon className="size-3 inline mr-1" />
            <p className="text-xs font-medium leading-4 tracking-normal text-muted-foreground">
              Ангилал
            </p>
          </div>
          <p className="text-sm font-normal leading-5 tracking-normal">
            {request.requestType.name}
          </p>
        </div>
        <div className="w-full flex flex-col items-start gap-2">
          <div className="flex gap-2">
            <Calendar className="size-3 inline mr-1" />
            <p className="text-xs font-medium leading-4 tracking-normal text-muted-foreground">
              Огноо
            </p>
          </div>
          <p className="text-sm font-normal leading-5 tracking-normal">
            {new Date(request.startDate).toLocaleDateString("mn-MN")}
          </p>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="flex gap-2">
            <TimerIcon className="size-3 inline mr-1" />
            <p className="text-xs font-medium leading-4 tracking-normal text-muted-foreground">
              Цаг
            </p>
          </div>
          <p className="text-sm font-normal leading-5 tracking-normal">
            {new Date(request.startDate).toLocaleDateString("mn-MN")} -{" "}
            {new Date(request.endDate).toLocaleDateString("mn-MN")}
          </p>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="flex gap-2">
            <Calendar className="size-3 inline mr-1" />
            <p className="text-xs font-medium leading-4 tracking-normal text-muted-foreground">
              Нийт
            </p>
          </div>
          <p className="text-sm font-normal leading-5 tracking-normal">
            {request.days} хоног
          </p>
        </div>
      </div>
      <p className="w-full border"></p>

      {/* Chuluu avah shaltgaan esvel tatgalzsan shaltgaan */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-normal leading-3.5 tracking-normal text-muted-foreground">
          {request.status === "REJECTED"
            ? "Татгалзах шалтгаан"
            : "Чөлөө авах шалтгаан"}
        </p>
        <p className="text-sm font-medium leading-5 tracking-normal text-muted-foreground">
          {request.rejectReason}
        </p>
      </div>
      {/* Tatgalzah/zovshooroh tovch. PENDING bish bol disabled blno */}
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          disabled={!isPending}
          onClick={onReject}
          className="p-4 bg-[#F4F4F5] rounded-md hover:bg-gray-200"
        >
          <X className="size-3" />
          <p className="flex text-xs font-medium leading-5 tracking-normal">
            Татгалзах
          </p>
        </Button>
        <Button
          disabled={!isPending}
          onClick={onApprove}
          className="flex p-4 bg-[#18181B] rounded-md hover:bg-gray-800/80"
        >
          <Check className="size-3" />
          <p className="text-xs font-medium leading-5 tracking-normal text-primary-foreground">
            Зөвшөөрөх
          </p>
        </Button>
      </div>
    </div>
  );
};
export default RequestDetailPanel;
