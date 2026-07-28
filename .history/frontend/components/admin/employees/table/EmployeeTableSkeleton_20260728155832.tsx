import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableCell, TableHeader, TableRow } from "@/components/ui/table";

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
        <TableCell>
          <Skeleton className="h-4 w-28" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-24" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-36" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-20" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-16" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-16" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-16" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-4" />
        </TableCell>
      </TableRow>,
    );
  }
  return (
    <div className="w-full rounded-md border border-[#E4E4E7] dark:border-gray-600 bg-white dark:bg-neutral-900 overflow-hidden">
      <Table>
        <TableHeader></TableHeader>
      </Table>
    </div>
  );
};
export default EmployeeTableSkeleton;
