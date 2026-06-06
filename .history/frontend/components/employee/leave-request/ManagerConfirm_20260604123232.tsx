import { Popover } from "@/components/ui/popover";
import { Manager } from "@/lib/types";

interface ManagerConfirmBox {
  value: number | null;
  managers: Manager[];
  onChange: (value: number) => void;
}

const ManagerConfirmBox = ({
  value,
  managers,
  onChange,
}: ManagerConfirmBox) => {
  return (
    <div className="flex flex-col gap-2">
      <Popover></Popover>
    </div>
  );
};
export default ManagerConfirmBox;
