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
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Leave Request" />
      </SelectTrigger>

      <SelectItem value="annual">Leave Request</SelectItem>
    </Select>
  );
};
export default SelectDemo;
