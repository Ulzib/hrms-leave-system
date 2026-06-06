import {
  Combobox,
  ComboboxContent,
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
  const [open, setOpen] = useState(false);
  const selected = managers.find((m) => m.id === value);

  return (
    <div className="flex flex-col gap-2">
      <Label className="flex gap-0">
        <p className="text-sm font-medium leading-3.5 tracking-normal">
          Хэнээр хүсэлтээ батлуулах аа сонгоно уу
        </p>
        <p className="font-medium text-sm leading-3.5 text-[#EF4444]">*</p>
      </Label>
      <Combobox open={open} onOpenChange={setOpen}>
        <ComboboxInput placeholder="Ажилтан олох"></ComboboxInput>
        <ComboboxContent>
          <ComboboxList>
            <ComboboxItem></ComboboxItem>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
};
export default ManagerComboBox;
