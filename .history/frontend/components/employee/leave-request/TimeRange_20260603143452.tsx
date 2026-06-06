import { LeaveFormData } from "@/lib/types";

interface TimeRangeProps {
  startTime: string;
  endTime:string;
  onChange : <K extends keyof LeaveFormData>
}

const TimeRange = () => {
  return <div>hi</div>;
};
export default TimeRange;
