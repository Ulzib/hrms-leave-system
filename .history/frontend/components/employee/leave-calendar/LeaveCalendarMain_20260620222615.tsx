"use client";

import { useEffect, useState } from "react";
import PickDate from "../dashboard/comps/PickDate";
import { DateRange } from "react-day-picker";
import RequestButton from "../dashboard/comps/RequestButton";
import { format } from "date-fns";
import api from "@/lib/axios";
import LeaveCalendarList from "./LeaveCalendarList";

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

  //selectDate uurchlugduh burd server-s leave list tatna
  useEffect(() => {
    const fetchLeaves = async () => {
      setLoading(true);
      setError("");

      try {
        //date range bval query params-r damjuulna
        const params: { startDate?: string; endDate?: string } = {};

        if (selectedDate?.from) {
          params.startDate = format(selectedDate.from, "yyyy-MM-dd");
        }
        if (selectedDate?.to) {
          params.endDate = format(selectedDate.to, "yyyy-MM-dd");
        } else if (selectedDate?.from) {
          params.endDate = format(selectedDate.from, "yyyy-MM-dd");
        }
        const res = await api.get("/leave/approved", { params });
        setLeaves(res.data);
      } catch (err) {
        console.error(err);
        setError("Өгөгдөл татахад алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, [selectedDate]); //selectedDate uurchlugduh burd useEff dahin shiner ajillaj, shine udriin ugugdliig database-g tatna

  if (!loading && !error && leaves.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-1">
        <p className="text-base font-semibold">
          Чөлөөний хүсэлт байхгүй байна.
        </p>
        <p className="text-sm text-muted-foreground">
          Нийт ажилтны чөлөөний хүсэлтүүд энд харагдана.
        </p>
      </div>
    );
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
      {!loading && !error && leaves.length > 0 && (
        <LeaveCalendarList leaves={leaves} />
      )}
    </div>
  );
};
export default LeaveCalendarMain;
