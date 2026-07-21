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
    <div className="w-full flex flex-col rounded-md border border-[] bg-white">
      <div className="flex bg-gray-100">
        <p>№</p>
        <p>Нэр, Овог</p>
        <p>Албан тушаал</p>
        <p>Имэйл</p>
        <p>Ажилд орсон огноо</p>
        <p>Зайнаас ажилласан өдөр</p>
        <p>Чөлөө авсан цаг</p>
        <p>Цалинтай чөлөө авсан өдөр</p>
        <p>Хүсэлт батлах ахлахажилтан болгох</p>
      </div>
    </div>
  );
};
export default EmployeeTable;
