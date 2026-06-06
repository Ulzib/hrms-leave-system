import LetterIcon from "@/components/svg/LetterIcon";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "radix-ui";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const SuccessModal = ({ open, onClose }: SuccessModalProps) => {
  const observer = new MutationObserver(() => {
    console.log("body style:", document.body.getAttribute("style"));
    console.log("body width:", document.body.offsetWidth);
    console.log("window width:", window.innerWidth);
  });
  observer.observe(document.body, { attributes: true });
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        aria-describedby={undefined}
        className="max-w-xl mx-auto border rounded-sm"
      >
        <VisuallyHidden.Root>
          <DialogTitle>Амжилттай илгээгдлээ</DialogTitle>
        </VisuallyHidden.Root>
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
