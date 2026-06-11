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

interface PickDateProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

const PickDate = ({ selectedDate, onDateChange }: PickDateProps) => {
  return (
    <Field className="w-72">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker"
            className="justify-center py-5 font-normal"
          >
            <CalendarIcon />
            {selectedDate ? (
              format(selectedDate, "yyyy/MM/dd")
            ) : (
              <span>Өдөр сонгох</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateChange}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
};
export default PickDate;
