"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DateProps {
  value: string;
  onChange: (value: string) => void;
}

const DateField = ({ value, onChange }: DateProps) => {
  return (
    <div>
      <Label>Чөлөө авах өдөр</Label>
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
