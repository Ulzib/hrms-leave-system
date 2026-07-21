"use client";

import { Plus } from "lucide-react";
import { Button } from "../../ui/button";
import MonthSwitcher from "../filters/MonthSwitcher";
import { useCallback, useEffect, useState } from "react";
import { AdminEmployeeRow } from "@/lib/types";
import EmployeeTable from "./table/EmployeeTable";
import api from "@/lib/axios";
import AddEmployeeModal from "./modal/AddEmployeeModal";

const EmployeesListMain = () => {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [employees, setEmployees] = useState<AdminEmployeeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  //songogfsn ajiltan - checkbox darahd ehled end hadgalna
  const [getPromote, setGetPromote] = useState<AdminEmployeeRow | null>(null);

  const fetchEmployees = useCallback(async () => {
    try {
      const res = await api.get("/admin/employees", {
        params: { month, year },
      });
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [month, year]);

  useEffect(() => {
    const timer = setTimeout(fetchEmployees, 0);
    return () => clearTimeout(timer);
  }, [fetchEmployees]);

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
          <Button
            className="py-5 px-4 gap-2"
            onClick={() => setAddModalOpen(true)}
          >
            <Plus className="size-4" />
            <p className="text-sm font-medium leading-5 tracking-normal text-primary-foreground">
              Шинэ ажилтан бүртгэх
            </p>
          </Button>
        </div>
      </div>
      {loading ? (
        <p className="text-sm text-muted-foreground">Ачааллаж байна...</p>
      ) : (
        <EmployeeTable employees={employees} onPromoteClick={setGetPromote} />
      )}
      <AddEmployeeModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSuccess={fetchEmployees}
      />
    </div>
  );
};
export default EmployeesListMain;
