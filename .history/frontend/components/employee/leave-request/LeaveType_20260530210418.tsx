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
        <p>Төрөл</p>
        <p>*</p>
      </Label>
    </div>
  );
};
export default LeaveTypeField;
