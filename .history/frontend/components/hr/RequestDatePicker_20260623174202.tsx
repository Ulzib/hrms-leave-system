import { DateRange } from "react-day-picker";

interface RequestDatePickerProps {
  selectedDate: DateRange | undefined;
  onDateChange: (date: DateRange | undefined) => void;
}

const RequestDatePicker = ({
  selectedDate,
  onDateChange,
}: RequestDatePickerProps) => {
  return <div>hi</div>;
};
export default RequestDatePicker;
