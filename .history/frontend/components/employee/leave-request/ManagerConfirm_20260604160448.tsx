import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select } from "@/components/ui/select";
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
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Select
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selected ? selected.name : "Ажилтан сонгох"}
          </Select>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput />
            <CommandList>
              <CommandEmpty></CommandEmpty>
              <CommandGroup>
                <CommandItem></CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default ManagerComboBox;
