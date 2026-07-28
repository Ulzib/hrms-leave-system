import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
        <TableHeader>
          <TableRow className="text-sm dark:text-gray-200 font-semibold leading-4 tracking-normal divide-x divide-[#E4E4E7] dark:divide-gray-600 bg-[#F4F4F5] dark:bg-muted">
            <TableHead>№</TableHead>
            <TableHead>Нэр, Овог</TableHead>
            <TableHead>Албан тушаал</TableHead>
            <TableHead>Имэйл</TableHead>
            <TableHead>Ажилд орсон огноо</TableHead>
            <TableHead>Зайнаас ажилласан өдөр</TableHead>
            <TableHead>Чөлөө авсан цаг</TableHead>
            <TableHead>Цалинтай чөлөө авсан өдөр</TableHead>
            <TableHead>Хүсэлт батлах ажилтан болгох</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
};
export default EmployeeTableSkeleton;
