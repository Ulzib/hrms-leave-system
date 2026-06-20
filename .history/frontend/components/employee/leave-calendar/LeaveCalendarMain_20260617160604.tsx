"use client";

import { useState } from "react";
import PickDate from "../dashboard/comps/PickDate";
import { DateRange } from "react-day-picker";
import RequestButton from "../dashboard/comps/RequestButton";

const LeaveCalendarMain = () => {
  //date picker-s songosn ognoo
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-xl font-semibold leading-7 tracking-[-2.5%]">
        Чөлөө авсан:
      </h4>
      <div className="flex justify-between items-center">
        <PickDate selectedDate={selectedDate} onDateChange={setSelectedDate} />
        <RequestButton />
      </div>
    </div>
  );
};
export default LeaveCalendarMain;
