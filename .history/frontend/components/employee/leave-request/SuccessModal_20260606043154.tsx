import LetterIcon from "@/components/svg/LetterIcon";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const SuccessModal = ({ open, onClose }: SuccessModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      aria-describedby={undefined}
      <DialogContent className="max-w-xl mx-auto border rounded-sm">
        <div className="flex flex-col items-center gap-8 py-4 px-1">
          <LetterIcon size={40} />
          <div className="flex flex-col gap-1.5 text-center">
            <h3 className="text-2xl font-semibold leading-8 tracking-[-2.5%]">
              Амжилттай илгээгдлээ
            </h3>
            <p className="text-center text-sm font-normal leading-5 tracking-normal text-muted-foreground ">
              Таны хүсэлттэй ахлах ажилтан танилцсаны дараа хариуг танд Teams
              Chat-аар мэдэгдэх болно.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default SuccessModal;
