import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectDemo = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Leave Request" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="annual">Annual Leave</SelectItem>
        <SelectItem value="sick">Sick Leave</SelectItem>
        <SelectItem value="unpaid">Unpaid Leave</SelectItem>
      </SelectContent>
    </Select>
  );
};
export default SelectDemo;
