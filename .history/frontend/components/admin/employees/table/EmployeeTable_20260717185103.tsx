import { Checkbox } from "@/components/ui/checkbox";
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
    <div className="w-full flex flex-col rounded-md border border-[#E4E4E7] bg-white divide-x">
      <div className="w-full flex items-stretch bg-[#F4F4F5] text-xs font-semibold leading-4 tracking-normal text-center border-b border-[#E4E4E7] divide-x divide-gray-300">
        <p className="w-12 flex items-center justify-center p-1">№</p>
        <p className="flex-1 flex items-center justify-center p-0">Нэр, Овог</p>
        <p className="flex-1 flex items-center justify-center p-1">
          Албан тушаал
        </p>
        <p className="flex-1 flex items-center justify-center p-1">Имэйл</p>
        <p className="flex-1 flex items-center justify-center p-1">
          Ажилд орсон огноо
        </p>
        <p className="flex-1 flex items-center justify-center p-1">
          Зайнаас ажилласан өдөр
        </p>
        <p className="flex-1 flex items-center justify-center p-1">
          Чөлөө авсан цаг
        </p>
        <p className="flex-1 flex items-center justify-center p-1">
          Цалинтай чөлөө авсан өдөр
        </p>
        <p className="flex-1 flex items-center justify-center p-1">
          Ахлах ажилтан болгох
        </p>
      </div>
      <div className="flex flex-col divide-y divide-[#E4E4E7] bg-white">
        {employees.map((employee, index) => (
          <div
            key={employee.id}
            className="w-full items-stretch bg-[#F4F4F5] text-xs font-semibold leading-4 tracking-normal text-center "
          >
            <p>{index + 1}</p>
            <p>{employee.username}</p>
            <p>{employee.position}</p>
            <p>{employee.email}</p>
            <p>{formatDate(employee.hiredAt)}</p>
            <p>{employee.remoteDays}</p>
            <p>{employee.leaveDays}</p>
            <p>{employee.paidLeaveDays}</p>
            <Checkbox
              checked={employee.role === "HR"}
              disabled={employee.role === "HR"}
              onCheckedChange={(checked) => {
                if (checked) {
                  onPromoteClick(employee);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default EmployeeTable;
