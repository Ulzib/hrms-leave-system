import { useState } from "react";
import Cards from "./comps/Cards";
import PickDate from "./comps/PickDate";
import RequestButton from "./comps/RequestButton";
import RequestLists from "./comps/RequestLists";

const DashboardEmp = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  return (
    <div className="flex flex-col gap-6">
      <Cards />
      <div className="flex flex-col gap-5 ">
        <h4 className="text-xl font-semibold leading-7 tracking-[-2.5%]">
          Миний явуулсан хүсэлтүүд
        </h4>
        <div className="flex justify-between">
          <PickDate
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
          <RequestButton />
        </div>
      </div>
      <RequestLists />
    </div>
  );
};
export default DashboardEmp;
