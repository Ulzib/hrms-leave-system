"use client";

import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const months = [
  "1-р сар",
  "2-р сар",
  "3-р сар",
  "4-р сар",
  "5-р сар",
  "6-р сар",
  "7-р сар",
  "8-р сар",
  "9-р сар",
  "10-р сар",
  "11-р сар",
  "12-р сар",
];

interface MonthProps {
  month: number;
  year: number;
  onChange: (month: number, year: number) => void;
}

const MonthSwitcher = ({ month, year, onChange }: MonthProps) => {
  const handlePrev = () => {
    if (month === 1) {
      onChange(12, year - 1);
      return;
    }
    onChange(month - 1, year);
  };

  const handleNext = () => {
    if (month === 12) {
      onChange(1, year + 1);
      return;
    }
    onChange(month + 1, year);
  };
  return (
    <div className="flex items-center gap-2  border rounded-md px-2 py-1.5 bg-white ">
      <Button variant="ghost" size="icon" onClick={handlePrev}>
        <ChevronLeft className="size-4" />
      </Button>
      <div className="flex items-center gap-2 text-sm font-medium w-28 ">
        <Calendar className="size-4" />
        <div className="flex gap-2">
          {months[month - 1]}
          {year}
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={handleNext}>
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
};
export default MonthSwitcher;
