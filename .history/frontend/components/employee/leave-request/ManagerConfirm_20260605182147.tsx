"use client";

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
  const [search, setSearch] = useState("");

  const selected = managers.find((m) => m.id === value)?.username ?? "";

  const filtered = managers.filter((m) =>
    m.username.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-2">
      <Label className="flex gap-0">
        <p className="text-sm font-medium leading-3.5 tracking-normal">
          Хэнээр хүсэлтээ батлуулах аа сонгоно уу
        </p>
        <p className="font-medium text-sm leading-3.5 text-[#EF4444]">*</p>
      </Label>
      <Combobox
        value={selected}
        onValueChange={(username) => {
          const manager = managers.find((m) => m.username === username);
          if (manager) onChange(manager.id);
        }}
      >
        <ComboboxInput placeholder="Ажилтан олох" />
        <ComboboxContent>
          <ComboboxList>
            {managers.map((manager) => (
              <ComboboxItem key={manager.id} value={manager.username}>
                {manager.username}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
};
export default ManagerComboBox;
