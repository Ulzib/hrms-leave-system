import LetterIcon from "@/components/svg/LetterIcon";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const SuccessModal = ({ open, onClose }: SuccessModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      {/* max-w-xl болон p-8, rounded-[8px] классуудаар цаад формтой нь ЯГ ИЖИЛХЭН болгов */}
      <DialogContent
        aria-describedby={undefined}
        className="max-w-xl w-full mx-auto border rounded-[8px] p-8 bg-white"
      >
        {/* А ARIA warning-ийг хаах үүднээс */}
        <VisuallyHidden.Root>
          <h3>Амжилттай илгээгдлээ</h3>
        </VisuallyHidden.Root>

        {/* Цаад формтой адил gap-8 авч, босоо тэнхлэгт голлууллаа */}
        <div className="flex flex-col items-center gap-8 py-6">
          {/* Иконы хэмжээг зураг дээрх шиг тохиромжтой болгож томрууллаа */}
          <LetterIcon size={80} />

          <div className="flex flex-col gap-2 text-center">
            {/* Гарчгийн стиль */}
            <h3 className="text-2xl font-semibold leading-8 tracking-[-2.5%] text-black">
              Амжилттай илгээгдлээ
            </h3>

            {/* Тайлбар текстийн стиль */}
            <p className="text-center text-sm font-normal leading-5 tracking-normal text-[#71717A]">
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
