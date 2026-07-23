"use client";

import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";

interface PickDateProps {
  selectedDate: DateRange | undefined;
  onDateChange: (date: DateRange | undefined) => void;
}

const PickDate = ({ selectedDate, onDateChange }: PickDateProps) => {
  let dateLabel = "Өдөр сонгох";

  if (selectedDate?.from && selectedDate?.to) {
    dateLabel = `${format(selectedDate.from, "MM/dd")} - ${format(selectedDate.to, "MM/dd")}`;
  } else if (selectedDate?.from) {
    dateLabel = format(selectedDate.from, "MM/dd");
  }
  return (
    <Field className="w-72 dark:bg-muted">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex justify-center py-5 font-normal dark:text-gray-100"
          >
            <CalendarIcon />
            {dateLabel}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={selectedDate}
            onSelect={onDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
};
export default PickDate;
