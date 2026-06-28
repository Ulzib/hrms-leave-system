"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PlusCircle, Search } from "lucide-react";
import PickDate from "../employee/dashboard/comps/PickDate";
import { DateRange } from "react-day-picker";
import RequestDatePicker from "./RequestDatePicker";

const PendingRequestsMain = () => {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(
    undefined,
  );

  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-xl font-semibold leading-7 tracking-[-2.5%]">
        Хүсэлтүүд
      </h4>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute" />
            <Input
              placeholder="Хайх"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ring-0 focus:ring-0 focus:outline-none text-sm bg-[#FFFFFF] gap-2 px-3"
            />
          </div>
          <Button className="border-[#E4E4E7] border-dashed py-2.5 px-3 gap-2 rounded-md bg-[#FFFFFF] text-black">
            <PlusCircle />
            <p className="text-sm font-medium leading-5 tracking-normal">
              Төлөв
            </p>
          </Button>
        </div>
        <RequestDatePicker
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      </div>
    </div>
  );
};
export default PendingRequestsMain;
