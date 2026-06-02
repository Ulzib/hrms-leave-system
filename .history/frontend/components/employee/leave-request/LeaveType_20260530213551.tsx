import { Label } from "@/components/ui/label";
import { LeaveFormData, LeaveType } from "@/lib/types";

interface LeaveTypeProps {
  value: LeaveFormData["type"];
  onChange: (value: LeaveType) => void;
}

const LeaveTypeField = ({ value, onChange }: LeaveTypeProps) => {
  return (
    <div>
      <Label className="flex gap-0">
        <p className="text-sm font-medium leading-3.5 tracking-normal">Төрөл</p>
        <p className="font-medium text-sm leading-3.5 text-[#EF4444]">*</p>
      </Label>
      <p className="text-xs font-normal leading-4 tracking-normal">
        Хэрэв та ажлын 1 өдөрт багтаан 8 цагаас доош чөлөө авах бол{" "}
        <span className="text-xs font-semibold leading-3 tracking-normal">
          цагаар
        </span>
        , 8 цагаас илүү бол{" "}
        <span className="text-xs font-medium leading-3 tracking-normal">
          өдрөөр
        </span>{" "}
        гэдгийг сонгоно уу.
      </p>
    </div>
  );
};
export default LeaveTypeField;
