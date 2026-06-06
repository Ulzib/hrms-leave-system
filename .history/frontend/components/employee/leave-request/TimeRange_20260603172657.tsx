import { Label } from "@/components/ui/label";
import { LeaveFormData } from "@/lib/types";

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
            <p>{label}</p>{" "}
            <p className="font-medium text-sm leading-3.5 text-[#EF4444]">*</p>
          </Label>
        </div>
      ))}
    </div>
  );
};
export default TimeRange;
