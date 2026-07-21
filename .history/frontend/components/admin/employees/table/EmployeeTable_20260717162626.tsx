import { AdminEmployeeRow } from "@/lib/types";

interface EmployeeProps {
  employees: AdminEmployeeRow[];
  onPromoteClick: (employee: AdminEmployeeRow) => void;
}

const EmployeeTable = ({ employees, onPromoteClick }: EmployeeProps) => {
  return <div>hi</div>;
};
export default EmployeeTable;
