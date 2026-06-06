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
  return <div>hi</div>;
};
export default ManagerConfirmBox;
