import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

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
