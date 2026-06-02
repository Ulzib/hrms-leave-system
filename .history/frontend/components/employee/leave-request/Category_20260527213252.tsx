import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LeaveBalance, RequestType } from "@/lib/types";

interface CategoryProps {
  value: number | null;
  requestTypes: RequestType[];
  balances: LeaveBalance[];
  onChange: (value: number) => void;
}

const CategoryField = ({
  value,
  requestTypes,
  balances,
  onChange,
}: CategoryProps) => {
  const selected = requestTypes.find((t) => t.id === value);
  const balance = balances.find((b) => b.name === selected?.name);
  return (
    <div className="space-y-1.5">
      <div className="flex ">
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent></SelectContent>
        </Select>
        <Label htmlFor="category" className="flex gap-0">
          <p className="text-sm font-medium leading-3.5 tracking-normal">
            Ангилал
          </p>
          <p className="font-medium leading-3.5 text-red-600">*</p>
        </Label>
        {balance && (
          <div className="flex">
            <p className="text-xs font-normal leading-4 tracking-normal text-[#71717A]">
              Боломжит хугацаа: {""}
            </p>
            <p className="text-sm font-medium leading-0">
              {balance.remaining}хоног
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default CategoryField;
