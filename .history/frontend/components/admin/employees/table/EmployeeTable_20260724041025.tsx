"use client";

import { AdminEmployeeRow } from "@/lib/types";

import { Checkbox } from "@/components/ui/checkbox";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface EmployeeTableProps {
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

const EmployeeTable = ({ employees, onPromoteClick }: EmployeeTableProps) => {
  return (
    <div className="w-full rounded-md border border-[#E4E4E7] bg-white dark:bg-neutral-900">
      <Table>
        <TableHeader>
          <TableRow className="text-sm dark:text-gray-200 font-semibold leading-4 tracking-normal divide-x divide-[#E4E4E7] bg-[#F4F4F5] dark:bg-muted ">
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

        <TableBody>
          {employees.map((employee, index) => (
            <TableRow
              key={employee.id}
              className="text-sm font-normal leading-4 tracking-normal divide-x divide-[#E4E4E7] dark:divide-gray-200-400 dark:text-gray-300"
            >
              <TableCell>{index + 1}</TableCell>

              <TableCell>{employee.username}</TableCell>

              <TableCell>{employee.position}</TableCell>

              <TableCell>{employee.email}</TableCell>

              <TableCell>{formatDate(employee.hiredAt)}</TableCell>

              <TableCell>{employee.remoteDays} өдөр</TableCell>

              <TableCell>{employee.leaveDays} цаг</TableCell>

              <TableCell>{employee.paidLeaveDays} өдөр</TableCell>

              <TableCell>
                <Checkbox
                  checked={employee.role === "HR"}
                  disabled={employee.role === "HR"}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onPromoteClick(employee);
                    }
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeeTable;
