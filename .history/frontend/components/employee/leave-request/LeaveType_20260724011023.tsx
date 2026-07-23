import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LeaveFormData, LeaveType } from "@/lib/types";

interface LeaveTypeProps {
  value: LeaveFormData["type"];
  onChange: (value: LeaveType) => void;
}

const LeaveTypeField = ({ value, onChange }: LeaveTypeProps) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <Label className="flex gap-0">
        <p className="text-sm dark:text-gray-200  font-medium leading-3.5 tracking-normal">
          Төрөл
        </p>
        <p className="font-medium text-sm leading-3.5 text-[#EF4444]">*</p>
      </Label>
      <p className="text-xs font-normal leading-4 tracking-normal text-[#71717A]">
        Хэрэв та ажлын 1 өдөрт багтаан 8 цагаас доош чөлөө авах бол{" "}
        <span className="text-xs dark:text-white text-black font-semibold leading-3 tracking-normal">
          цагаар
        </span>
        , 8 цагаас илүү бол{" "}
        <span className="text-xs text-black dark:text-white font-semibold leading-3 tracking-normal">
          өдрөөр
        </span>{" "}
        гэдгийг сонгоно уу.
      </p>
      <RadioGroup
        value={value}
        onValueChange={(val) => onChange(val as LeaveType)}
        className="flex items-center gap-4"
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem value="hourly" id="hourly" />
          <Label
            htmlFor="hourly"
            className="text-sm dark:text-gray-200  font-medium leading-3.5 tracking-normal cursor-pointer"
          >
            Цагаар
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="daily" id="daily" />
          <Label
            htmlFor="daily"
            className="text-sm dark:text-gray-200  font-medium leading-3.5 tracking-normal cursor-pointer"
          >
            Өдрөөр
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};
export default LeaveTypeField;
