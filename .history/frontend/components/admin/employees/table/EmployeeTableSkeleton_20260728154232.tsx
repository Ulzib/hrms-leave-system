import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

const EmployeeTableSkeleton = () => {
  const rows = [];

  for (let i = 0; i < 6; i++) {
    rows.push(
      <TableRow key={i} className="divide-x divide-[#]">
        <TableCell>
          <Skeleton />
        </TableCell>
      </TableRow>,
    );
  }
  return <div></div>;
};
export default EmployeeTableSkeleton;
