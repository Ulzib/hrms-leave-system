"use client";

import { AdminEmployeeRow } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";

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
    <div className="w-full rounded-lg border bg-white shadow-sm overflow-hidden">
      {/* 1. ХҮСНЭГТИЙН ТОЛГОЙ (Зөвхөн компьютер дээр харагдана: md:flex) */}
      <div className="hidden md:flex items-center bg-gray-50 border-b text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">
        <div className="w-12">№</div>
        <div className="flex-1 min-w-[150px]">Нэр, Овог</div>
        <div className="w-40">Албан тушаал</div>
        <div className="w-52">Имэйл</div>
        <div className="w-36">Ажилд орсон</div>
        <div className="w-32 text-center">Зайнаас (Өдөр)</div>
        <div className="w-28 text-center">Чөлөө (Цаг)</div>
        <div className="w-28 text-center">Цалинтай чөлөө</div>
        <div className="w-40 text-center">Эрх дэвшүүлэх</div>
      </div>

      {/* 2. АЖИЛТНУУДЫН ЖАГСААЛТ */}
      <div className="divide-y divide-gray-200">
        {employees.map((employee, index) => (
          <div
            key={employee.id}
            // Гар утсан дээр блок (карт) хэлбэрээр, компьютер дээр flex (мөр) хэлбэрээр харагдана
            className="block md:flex md:items-center py-4 px-4 text-sm text-gray-700 space-y-2 md:space-y-0 hover:bg-gray-50 transition-colors"
          >
            {/* ---- КОМПЬЮТЕР ДЭЭР МӨР БАЙДЛААР ХАРАГДАХ ХЭСЭГ ---- */}
            <div className="md:w-12 font-medium text-gray-400">
              <span className="md:hidden text-xs text-gray-400 mr-1">№:</span>
              {index + 1}
            </div>

            <div className="md:flex-1 md:min-w-[150px] font-medium text-gray-900">
              {employee.username}
            </div>

            <div className="md:w-40 flex md:block justify-between">
              <span className="md:hidden font-medium text-gray-400">
                Албан тушаал:
              </span>
              {employee.position}
            </div>

            <div className="md:w-52 flex md:block justify-between break-all pr-2">
              <span className="md:hidden font-medium text-gray-400">
                Имэйл:
              </span>
              {employee.email}
            </div>

            <div className="md:w-36 flex md:block justify-between">
              <span className="md:hidden font-medium text-gray-400">
                Ажилд орсон:
              </span>
              {formatDate(employee.hiredAt)}
            </div>

            <div className="md:w-32 flex md:block justify-between md:text-center">
              <span className="md:hidden font-medium text-gray-400">
                Зайнаас ажилласан:
              </span>
              {employee.remoteDays} өдөр
            </div>

            <div className="md:w-28 flex md:block justify-between md:text-center">
              <span className="md:hidden font-medium text-gray-400">
                Чөлөө авсан:
              </span>
              {employee.leaveDays} цаг
            </div>

            <div className="md:w-28 flex md:block justify-between md:text-center">
              <span className="md:hidden font-medium text-gray-400">
                Цалинтай чөлөө:
              </span>
              {employee.paidLeaveDays} өдөр
            </div>

            <div className="md:w-40 flex md:block justify-between items-center md:text-center pt-2 md:pt-0 border-t border-dashed md:border-none">
              <span className="md:hidden font-medium text-gray-400">
                Хүсэлт батлах эрх:
              </span>
              <div className="flex md:justify-center">
                <Checkbox
                  checked={employee.role === "HR"}
                  disabled={employee.role === "HR"}
                  onCheckedChange={(checked) => {
                    if (checked) onPromoteClick(employee);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeTable;
