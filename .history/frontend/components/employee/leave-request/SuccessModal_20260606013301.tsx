import { Dialog } from "@/components/ui/dialog";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const SuccessModal = ({ open, onClose }: SuccessModalProps) => {
  return <Dialog open={open} onOpenChange={onClose}></Dialog>;
};
export default SuccessModal;
