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

  return <div className="flex flex-col gap-2"></div>;
};
export default ManagerComboBox;
