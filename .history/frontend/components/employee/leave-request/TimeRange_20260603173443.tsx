import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LeaveFormData } from "@/lib/types";
import { ChevronsUpDown } from "lucide-react";

interface TimeRangeProps {
  startTime: string;
  endTime: string;
  onChange: <K extends keyof LeaveFormData>(
    key: K,
    value: LeaveFormData[K],
  ) => void;
}

const TIME_FILEDS = [
  { key: "startTime" as const, label: "Эхлэх цаг" },
  { key: "endTime" as const, label: "Дуусах цаг" },
];

const TimeRange = ({ startTime, endTime, onChange }: TimeRangeProps) => {
  const values = { startTime, endTime };
  return (
    <div className="grid grid-cols-2 gap-6">
      {TIME_FILEDS.map(({ key, label }) => (
        <div key={key}>
          <Label htmlFor={key} className="flex gap-0">
            <p className="text-sm font-medium leading-3.5 tracking-normal">
              {label}
            </p>
            <p className="font-medium text-sm leading-3.5 text-[#EF4444]">*</p>
          </Label>
          <Select
            value={values[key]}
            onValueChange={(val) => onChange(key, val)}
          >
            <SelectTrigger id={key}>
              <SelectValue />
              <ChevronsUpDown />
            </SelectTrigger>
            <SelectContent></SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
};
export default TimeRange;
