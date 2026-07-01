"use client";

interface ApproveModalProps {
  open: boolean;
  requestId: number;
  onClose: () => void;
  onSuccess: () => void; //req ee amjilttai blsni dra duudna, list refresh blno
}

const ConfirmApproveModal = ({
  open,
  requestId,
  onClose,
  onSuccess,
}: ApproveModalProps) => {
  return <div>hi</div>;
};
export default ConfirmApproveModal;
