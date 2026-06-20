import { useState } from "react";
import PickDate from "../dashboard/comps/PickDate";
import { DateRange } from "react-day-picker";

const LeaveCalendarMain = () => {
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(
    undefined,
  );
  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-xl font-semibold leading-7 tracking-[-2.5%]">
        Чөлөө авсан:
      </h4>
      <div className="flex justify-between items-center">
        <PickDate selectedDate={selectedDate} onDateChange={setSelectedDate} />
      </div>
    </div>
  );
};
export default LeaveCalendarMain;
