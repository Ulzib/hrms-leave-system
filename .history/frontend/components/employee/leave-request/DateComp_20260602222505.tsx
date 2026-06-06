"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DateProps {
  value: string;
  onChange: (value: string) => void;
}

const DateField = ({ value, onChange }: DateProps) => {
  return (
    <div className="spacey-3">
      <Label htmlFor="date" className="flex gap-0">
        <p className="text-sm font-medium leading-3.5 tracking-normal">
          Чөлөө авах өдөр
        </p>
        <p className="font-medium text-sm leading-3.5 text-[#EF4444]">*</p>
      </Label>
      <Input
        id="date"
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
export default DateField;
