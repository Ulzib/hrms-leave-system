import { Plus } from "lucide-react";
import { Button } from "../../ui/button";
import MonthSwitcher from "../filters/MonthSwitcher";
import { useState } from "react";

const StaffListMain = () => {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());

  const handleMonthChange = (newMonth: number, newYear: number) => {
    setMonth(newMonth);
    setYear(newYear);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-semibold leading-7 tracking-[-2.5%]">
          Нийт ажилчид
        </h4>
        <div className="flex items-center gap-7">
          <MonthSwitcher
            month={month}
            year={year}
            onChange={handleMonthChange}
          />
          <Button className="py-5 px-4 gap-2">
            <Plus className="size-4" />
            <p className="text-sm font-medium leading-5 tracking-normal text-primary-foreground">
              Шинэ ажилтан бүртгэх
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default StaffListMain;
