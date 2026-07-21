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
      <div className="w-full flex items-center justify-between py-2 px-4 bg-[#F4F4F5] text-sm font-semibold leading-4 tracking-normal text-center border-x border-gray-50">
        <p>№</p>
        <p>Нэр, Овог</p>
        <p>Албан тушаал</p>
        <p>Имэйл</p>
        <p>Ажилд орсон огноо</p>
        <p>Зайнаас ажилласан өдөр</p>
        <p>Чөлөө авсан цаг</p>
        <p>Цалинтай чөлөө авсан өдөр</p>
        <p>Ахлах ажилтан болгох</p>
      </div>
      <div className="divide-y divide-gray-200 bg-white">
        {employees.map((employee, index) => (
          <div key={employee.id}>
            <p>{index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default EmployeeTable;
