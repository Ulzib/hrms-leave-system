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
    // Гадна талын хайрцагны илүүц "divide-x"-ийг хасав
    <div className="w-full flex flex-col rounded-md border border-[#E4E4E7] bg-white overflow-hidden">
      {/* 1. ХҮСНЭГТИЙН ТОЛГОЙ (HEADER) */}
      <div className="w-full flex items-stretch bg-[#F4F4F5] text-xs font-semibold leading-4 tracking-normal text-center border-b border-[#E4E4E7] divide-x divide-gray-300">
        {/* № баганын padding-ийг дата хэсэгтэй яг ижил py-3 болгов */}
        <p className="w-12 flex items-center justify-center py-3 px-1">№</p>
        <p className="flex-1 flex items-center justify-center py-3 px-1">
          Нэр, Овог
        </p>
        <p className="flex-1 flex items-center justify-center py-3 px-1">
          Албан тушаал
        </p>
        <p className="flex-1 flex items-center justify-center py-3 px-1">
          Имэйл
        </p>
        <p className="flex-1 flex items-center justify-center py-3 px-1">
          Ажилд орсон огноо
        </p>
        <p className="flex-1 flex items-center justify-center py-3 px-1">
          Зайнаас ажилласан өдөр
        </p>
        <p className="flex-1 flex items-center justify-center py-3 px-1">
          Чөлөө авсан цаг
        </p>
        <p className="flex-1 flex items-center justify-center py-3 px-1">
          Цалинтай чөлөө авсан өдөр
        </p>
        <p className="flex-1 flex items-center justify-center py-3 px-1">
          Ахлах ажилтан болгох
        </p>
      </div>

      {/* 2. ХҮСНЭГТИЙН ДАТА (ROWS) */}
      {/* Гаднах div-ийн илүүц "divide-x"-ийг хасав */}
      <div className="flex flex-col divide-y divide-[#E4E4E7] bg-white">
        {employees.map((employee, index) => (
          <div
            key={employee.id}
            // Арын өнгийг цагаан "bg-white" болгов (дуураймал саарал өнгийг арилгав)
            // Текстүүдийг "text-gray-700 font-normal" болгож толгой хэсгээс ялгаатай болгов
            className="w-full flex items-stretch bg-white text-xs font-normal leading-4 tracking-normal text-center text-gray-700 hover:bg-gray-50 transition-colors divide-x divide-gray-200"
          >
            <p className="w-12 flex items-center justify-center py-3 text-gray-400 font-medium">
              {index + 1}
            </p>
            <p className="flex-1 flex items-center justify-center py-3 px-1 font-medium text-gray-950">
              {employee.username}
            </p>
            <p className="flex-1 flex items-center justify-center py-3 px-1">
              {employee.position}
            </p>
            {/* Имэйл урт үед багтахгүй халихгүй байх "break-all" нэмэв */}
            <p className="flex-1 flex items-center justify-center py-3 px-1 break-all">
              {employee.email}
            </p>
            <p className="flex-1 flex items-center justify-center py-3 px-1">
              {formatDate(employee.hiredAt)}
            </p>
            <p className="flex-1 flex items-center justify-center py-3 px-1">
              {employee.remoteDays} өдөр
            </p>
            <p className="flex-1 flex items-center justify-center py-3 px-1">
              {employee.leaveDays} цаг
            </p>
            <p className="flex-1 flex items-center justify-center py-3 px-1">
              {employee.paidLeaveDays} өдөр
            </p>

            {/* ✅ ЭНД ЗАССАН: Checkbox-ийг "flex-1" div дотор хийснээр баганын хэмжээ яг таг таарна */}
            <div className="flex-1 flex items-center justify-center py-3 px-1">
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
