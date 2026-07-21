import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

interface HiredDatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}

const HiredDatePicker = ({ value, onChange }: HiredDatePickerProps) => {
  let dateLabel = "Огноо сонгох";

  if (value) {
    dateLabel = format(value, "yyyy-MM-dd");
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start h-9 gap-2 font-normal text-sm bg-white"
        >
          <Calendar className="size-4" />
          {dateLabel}
        </Button>
      </PopoverTrigger>
    </Popover>
  );
};
export default HiredDatePicker;
