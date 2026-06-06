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
  return <div className="grid grid-cols-2 gap-6"></div>;
};
export default TimeRange;
