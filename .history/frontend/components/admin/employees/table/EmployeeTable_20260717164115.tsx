import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminEmployeeRow } from "@/lib/types";

interface EmployeeProps {
  employees: AdminEmployeeRow[];
  onPromoteClick: (employee: AdminEmployeeRow) => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

const EmployeeTable = ({ employees, onPromoteClick }: EmployeeProps) => {
  return (
    <div className="w-full rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>№</TableHead>
            <TableHead>Нэр, Овог</TableHead>
            <TableHead>Албан тушаал</TableHead>
            <TableHead>Имэйл</TableHead>
            <TableHead>Ажилд орсон огноо</TableHead>
            <TableHead>Чөлөө авсан цаг</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
};
export default EmployeeTable;
