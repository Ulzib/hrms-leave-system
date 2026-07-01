interface RejectReasonModalProps {
  open: boolean;
  requestId: number;
  onClose: () => void;
  onSuccess: () => void;
}

const RejectReasonModal = ({
  open,
  requestId,
  onClose,
  onSuccess,
}: RejectReasonModalProps) => {
  return <div>hi</div>;
};
export default RejectReasonModal;
