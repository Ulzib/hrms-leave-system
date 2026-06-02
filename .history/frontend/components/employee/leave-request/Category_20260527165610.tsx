import { Label } from "@/components/ui/label";
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
  return (
    <div className="space-y-1.5">
      <div className="flex ">
        <Label htmlFor="category" className="flex gap-0">
          <p className="text-sm font-medium leading-3.5 tracking-normal">
            Ангилал
          </p>
          <p className="font-medium leading-3.5 text-red-600">*</p>
        </Label>
      </div>
    </div>
  );
};
export default CategoryField;
