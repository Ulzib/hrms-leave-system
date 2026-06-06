import { LeaveFormData } from "@/lib/types";

interface TimeRangeProps {
  startTime: string;
  endTime: string;
  onChange: <K extends keyof LeaveFormData>(
    key: K,
    value: LeaveFormData[K],
  ) => void;
}

const TimeRange = () => {
  return <div>hi</div>;
};
export default TimeRange;
