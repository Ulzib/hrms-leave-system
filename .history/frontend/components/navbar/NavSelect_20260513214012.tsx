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
      <SelectContent>
        <SelectItem value="annual">Leave Request</SelectItem>
      </SelectContent>
    </Select>
  );
};
export default SelectDemo;
