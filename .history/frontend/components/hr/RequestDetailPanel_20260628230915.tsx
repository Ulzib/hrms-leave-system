import { LeaveRequestItem } from "./PendingRequestsList";

interface DetailPanelProps {
  request: LeaveRequestItem;
  onApprove: () => void;
  onReject: () => void;
}

const RequestDetailPanel = ({
  request,
  onApprove,
  onReject,
}: DetailPanelProps) => {
  return <div>hi</div>;
};
export default RequestDetailPanel;
