import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

const EmployeeTableSkeleton = () => {
  const rows = [];

  for (let i = 0; i < 6; i++) {
    rows.push(
      <TableRow
        key={i}
        className="divide-x divide-[#E4E4E7] dark:divide-gray-600"
      >
        <TableCell>
          <Skeleton className="h-4 w-6" />
        </TableCell>
      </TableRow>,
    );
  }
  return <div></div>;
};
export default EmployeeTableSkeleton;
