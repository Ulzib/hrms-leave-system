import { Label } from "@/components/ui/label";

interface ReasonProps {
  value: string;
  onChange: (value: string) => void;
}

const ReasonInput = ({ value, onChange }: ReasonProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label className="flex gap-0">
        <p className="text-sm font-medium leading-3.5 tracking-normal">
          Чөлөө авах шалтгаан{" "}
        </p>
        <p className="font-medium text-sm leading-3.5 text-[#EF4444]">*</p>
      </Label>
    </div>
  );
};
export default ReasonInput;
