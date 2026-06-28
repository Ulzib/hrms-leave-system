import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

interface RequestDatePickerProps {
  selectedDate: DateRange | undefined;
  onDateChange: (date: DateRange | undefined) => void;
}

const RequestDatePicker = ({
  selectedDate,
  onDateChange,
}: RequestDatePickerProps) => {
  let dateLabel = "Өдөр сонгох";

  if (selectedDate?.from && selectedDate?.to) {
    dateLabel = `${format(selectedDate.from, "d MMMM yyyy")} - ${format(selectedDate.to, "d MMMM yyyy")}`;
  } else if (selectedDate?.from) {
    dateLabel = format(selectedDate?.from, "d MMMM yyyy");
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <CalendarIcon />
          {dateLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="range"
          selected={selectedDate}
          onSelect={onDateChange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
};
export default RequestDatePicker;
