import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";

import { Manager } from "@/lib/types";
import { useState } from "react";

interface ComboBoxProps {
  value: number | null;
  managers: Manager[];
  onChange: (value: number) => void;
}

const ManagerComboBox = ({ value, managers, onChange }: ComboBoxProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label className="flex gap-0">
        <p className="text-sm font-medium leading-3.5 tracking-normal">
          Хэнээр хүсэлтээ батлуулах аа сонгоно уу
        </p>
        <p className="font-medium text-sm leading-3.5 text-[#EF4444]">*</p>
      </Label>
      <Combobox
        value={value ? String(value) : ""}
        onValueChange={(val) => onChange(Number(val))}
      >
        <ComboboxInput placeholder="Ажилтан олох" />
        <ComboboxContent>
          <ComboboxList>
            {managers.map((manager) => (
              <ComboboxItem key={manager.id} value={String(manager.id)}>
                {manager.username}
              </ComboboxItem>
            ))}
          </ComboboxList>

          <ComboboxEmpty>Олдсонгүй.</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
    </div>
  );
};
export default ManagerComboBox;
