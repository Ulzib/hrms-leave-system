"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
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
  console.log("selected name:", selected?.name);
  console.log(
    "balance names:",
    balances.map((b) => b.name),
  );
  return (
    <div className="space-y-1.5">
      <div className="flex flex-col">
        <Label htmlFor="category" className="flex gap-0">
          <p className="text-sm font-medium leading-3.5 tracking-normal">
            Ангилал
          </p>
          <p className="font-medium leading-3.5 text-red-600">*</p>
        </Label>
        <Select
          value={value ? String(value) : ""}
          onValueChange={(val) => onChange(Number(val))}
        >
          <SelectTrigger id="category" className="w-full flex flex-col gap-8">
            <SelectValue placeholder="Сонгоно уу" />
          </SelectTrigger>
          <SelectContent position="popper" sideOffset={4}>
            {requestTypes.map((type) => (
              <SelectItem key={type.id} value={String(type.id)}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {balance && (
          <div className="flex">
            <p className="text-xs font-normal leading-4 tracking-normal text-[#71717A]">
              Боломжит хугацаа: {""}
            </p>
            <p className="text-sm font-medium leading-0">
              {balance.remaining} хоног
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default CategoryField;
