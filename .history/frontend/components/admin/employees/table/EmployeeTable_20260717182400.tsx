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
    // Гадна талын хайрцаг
    <div className="w-full flex flex-col rounded-md border border-[#E4E4E7] bg-white overflow-hidden">
      {/* 1. ХҮСНЭГТИЙН ТОЛГОЙ (HEADER) */}
      <div className="w-full flex items-stretch bg-[#F4F4F5] text-sm font-semibold leading-4 tracking-normal text-center border-b border-[#E4E4E7] divide-x divide-gray-300">
        <p className="w-12 flex items-center justify-center py-3">№</p>
        <p className="flex-1 flex items-center justify-center py-3 px-2">
          Нэр, Овог
        </p>
        <p className="flex-1 flex items-center justify-center py-3 px-2">
          Албан тушаал
        </p>
        <p className="flex-1 flex items-center justify-center py-3 px-2">
          Имэйл
        </p>
        <p className="flex-1 flex items-center justify-center py-3 px-2">
          Ажилд орсон огноо
        </p>
        <p className="flex-1 flex items-center justify-center py-3 px-2">
          Зайнаас ажилласан өдөр
        </p>
        <p className="flex-1 flex items-center justify-center py-3 px-2">
          Чөлөө авсан цаг
        </p>
        <p className="flex-1 flex items-center justify-center py-3 px-2">
          Цалинтай чөлөө авсан өдөр
        </p>
        <p className="flex-1 flex items-center justify-center py-3 px-2">
          Ахлах ажилтан болгох
        </p>
      </div>

      {/* 2. ХҮСНЭГТИЙН ДАТА (ROWS) */}
      <div className="flex flex-col divide-y divide-[#E4E4E7] bg-white">
        {employees.map((employee, index) => (
          // Мөр бүрийг flex items-stretch болгосноор босоо зураас бүтэн тусна
          <div
            key={employee.id}
            className="w-full flex items-stretch text-sm text-center text-gray-700 hover:bg-gray-50 transition-colors divide-x divide-gray-200"
          >
            <p className="w-12 flex items-center justify-center py-3 text-gray-400 font-medium">
              {index + 1}
            </p>
            <p className="flex-1 flex items-center justify-center py-3 px-2 text-gray-950 font-medium">
              {employee.username}
            </p>
            <p className="flex-1 flex items-center justify-center py-3 px-2">
              {employee.position}
            </p>
            <p className="flex-1 flex items-center justify-center py-3 px-2 break-all">
              {employee.email}
            </p>
            <p className="flex-1 flex items-center justify-center py-3 px-2">
              {formatDate(employee.hiredAt)}
            </p>
            <p className="flex-1 flex items-center justify-center py-3 px-2">
              {employee.remoteDays} өдөр
            </p>
            <p className="flex-1 flex items-center justify-center py-3 px-2">
              {employee.leaveDays} цаг
            </p>
            <p className="flex-1 flex items-center justify-center py-3 px-2">
              {employee.paidLeaveDays} өдөр
            </p>
            <div className="flex-1 flex items-center justify-center py-3 px-2">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeTable;
