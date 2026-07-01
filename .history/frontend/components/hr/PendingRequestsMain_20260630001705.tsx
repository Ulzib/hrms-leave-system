"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PlusCircle, Search } from "lucide-react";
import { DateRange } from "react-day-picker";
import RequestDatePicker from "./RequestDatePicker";
import PendingRequestsList, { LeaveRequestItem } from "./PendingRequestsList";
import RequestDetailPanel from "./RequestDetailPanel";
import ConfirmApproveModal from "./ConfirmApproveModal";

const PendingRequestsMain = () => {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(
    undefined,
  );
  //List-s songogdson huselt, baruun taliin panel
  const [selectedRequest, setSelectedRequest] =
    useState<LeaveRequestItem | null>(null);

  return (
    <div className="w-full flex flex-col gap-2 ">
      <div className="w-full flex flex-col gap-5">
        <h4 className="text-xl font-semibold leading-7 tracking-[-2.5%]">
          Хүсэлтүүд
        </h4>
        <div className="w-full flex justify-between">
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground " />
              <Input
                placeholder="Хайх"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="ring-0 focus:ring-0 focus:outline-none text-sm bg-[#FFFFFF] gap-2 pl-9 pr-3 h-9 w-60"
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
      <div className="flex  gap-5">
        {/*zuun lists */}
        <div className="w-full grid grid-cols gap-4 items-start">
          <PendingRequestsList
            search={search}
            selectedDate={selectedDate}
            selectedId={selectedRequest?.id ?? null}
            onSelect={setSelectedRequest}
          />
        </div>
        <div className="w-full">
          {/*baruun panel */}
          {selectedRequest ? (
            <RequestDetailPanel
              request={selectedRequest}
              onApprove={() => {
                console.log("approve", selectedRequest.id);
              }}
              onReject={() => {
                console.log("reject", selectedRequest.id);
              }}
            />
          ) : (
            <div className="rounded-xl border bg-white p-6 text-sm text-muted-foreground">
              Хүсэлтээ сонгоно уу
            </div>
          )}
        </div>
        {/*approve,reject modal. Songosn req bga ued l render blno*/}
        {selectedRequest && (
          <>
            <ConfirmApproveModal open={} />
          </>
        )}
      </div>
    </div>
  );
};
export default PendingRequestsMain;
