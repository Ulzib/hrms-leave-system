import { Label } from "@/components/ui/label";
import { LeaveFormData, LeaveType } from "@/lib/types";

interface LeaveTypeProps {
  value: LeaveFormData["type"];
  onChange: (value: LeaveType) => void;
}

const LeaveTypeField = ({ value, onChange }: LeaveTypeProps) => {
  return (
    <div>
      <Label>
        <p className="text-sm font-medium leading-3.5 tracking-normal">Төрөл</p>
        <p className="font-medium text-sm leading-3.5">*</p>
      </Label>
    </div>
  );
};
export default LeaveTypeField;
