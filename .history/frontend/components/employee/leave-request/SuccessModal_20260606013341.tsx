import { Dialog, DialogContent } from "@/components/ui/dialog";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const SuccessModal = ({ open, onClose }: SuccessModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl"></DialogContent>
    </Dialog>
  );
};
export default SuccessModal;
