import { LeaveFormData, LeaveType } from "@/lib/types";

interface LeaveTypeProps {
  value: LeaveFormData["type"];
  onChange: (value: LeaveType) => void;
}

const LeaveTypeField = ({ value, onChange }: LeaveTypeProps) => {
  return <div>hi</div>;
};
export default LeaveTypeField;
