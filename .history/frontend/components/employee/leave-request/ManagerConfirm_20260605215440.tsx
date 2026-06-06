"use client";

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
        defaultValue=""
        onValueChange={(username) => {
          const manager = managers.find((m) => m.username === username);
          if (manager) {
            onChange(manager.id);
            setSearch("");
          }
        }}
      >
        <ComboboxInput
          placeholder={selected || "Ажилтан олох"}
          onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
        />
        <ComboboxContent>
          <ComboboxList>
            {filtered.length > 0 ? (
              filtered.map((manager) => (
                <ComboboxItem
                  key={manager.id}
                  value={manager.username}
                  className="text-sm font-normal leading-5 tracking-normal py-1.5 px-2 bg-"
                >
                  {manager.username}
                </ComboboxItem>
              ))
            ) : (
              <p className="py-2 text-center text-sm text-muted-foreground">
                Олдсонгүй.
              </p>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
};
export default ManagerComboBox;
