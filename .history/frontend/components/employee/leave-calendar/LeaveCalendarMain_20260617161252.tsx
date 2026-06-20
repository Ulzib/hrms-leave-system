"use client";

import { useState } from "react";
import PickDate from "../dashboard/comps/PickDate";
import { DateRange } from "react-day-picker";
import RequestButton from "../dashboard/comps/RequestButton";

//backend-s ireh chuluuni database butets
interface ApprovedLeave {
  id: number;
  startDate: string;
  endDate: string;
  days: number;
  user: {
    id: number;
    username: string;
    profilePicture: string | null;
  };
  requestType: {
    name: string;
  };
}

const LeaveCalendarMain = () => {
  //date picker-s songosn date
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(
    undefined,
  );
  //server-s tatsn leaves lists
  const [leaves, setLeaves] = useState<ApprovedLeave[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!loading && !error) {
    <div></div>;
  }
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
