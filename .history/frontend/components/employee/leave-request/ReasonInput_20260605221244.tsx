import { Label } from "@/components/ui/label";

interface ReasonProps {
  value: string;
  onChange: (value: string) => void;
}

const ReasonInput = ({ value, onChange }: ReasonProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label>Чөлөө авах шалтгаан</Label>
    </div>
  );
};
export default ReasonInput;
