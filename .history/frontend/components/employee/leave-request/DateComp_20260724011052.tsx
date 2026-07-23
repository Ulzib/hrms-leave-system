"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DateProps {
  value: string;
  onChange: (value: string) => void;
  label?: string; //default ni "chuluu avah udur"
}

const DateField = ({ value, onChange, label }: DateProps) => {
  const displayLabel = label ?? "Чөлөө авах өдөр";
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="date" className="flex gap-0">
        <p className="text-sm dark:text-gray-200  font-medium leading-3.5 tracking-normal">
          {displayLabel}{" "}
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
