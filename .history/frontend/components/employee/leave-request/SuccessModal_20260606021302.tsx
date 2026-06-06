import LetterIcon from "@/components/svg/LetterIcon";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const SuccessModal = ({ open, onClose }: SuccessModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl text-center border rounded-sm">
        <div className="flex flex-col items-center gap-8 p-8">
          <LetterIcon />
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default SuccessModal;
