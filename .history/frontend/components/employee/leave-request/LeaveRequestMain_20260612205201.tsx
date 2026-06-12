"use client";

import { useEffect, useState } from "react";
import CategoryField from "./Category";
import { LeaveBalance, LeaveFormData, Manager, RequestType } from "@/lib/types";
import { INITIAL_FORM } from "@/lib/constants";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { toast } from "sonner";
import LeaveTypeField from "./LeaveType";
import DateField from "./DateComp";
import TimeRange from "./TimeRange";
import ManagerComboBox from "./ManagerConfirm";
import ReasonInput from "./ReasonInput";
import SuccessModal from "./SuccessModal";

const LeaveRequestForm = () => {
  const {};
  return (
    <>
      <div className="w-full relative flex flex-col gap-8 border-[#E4E4E7] bg-white rounded-[8px] p-8 shadow-sm ">
        <div className="mb-1">
          <h3 className="text-2xl font-semibold leading-8 tracking-[-2.5%] ">
            Чөлөөний хүсэлт
          </h3>
          <p className="text-sm font-normal leading-5 tracking-normal text-[#71717A]">
            Ажлын цагаар оффис дээр байх боломжгүй болсон аль ч тохиолдолд тус
            формыг заавал бөглөнө.
          </p>
        </div>
        <CategoryField
          value={form.requestTypeId}
          requestTypes={requestTypes}
          balances={balances}
          onChange={(val) => handleChange("requestTypeId", val)}
        />
        {form.requestTypeId && (
          <>
            <LeaveTypeField
              value={form.type}
              onChange={(val) => handleChange("type", val)}
            />
            <DateField
              value={form.date}
              onChange={(val) => handleChange("date", val)}
            />
            {form.type === "hourly" && (
              <TimeRange
                startTime={form.startTime}
                endTime={form.endTime}
                onChange={handleChange}
              />
            )}
            <ManagerComboBox
              value={form.managerId}
              managers={managers}
              onChange={(val) => handleChange("managerId", val)}
            />
            <ReasonInput
              value={form.reason}
              onChange={(val) => handleChange("reason", val)}
            />
          </>
        )}

        <Button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className="ml-auto text-sm font-medium leading-5 tracking-normal py-5 px-4 gap-2 rounded-md text-[#FAFAFA]"
        >
          <Send />
          {loading ? "Илгээж байна.." : "Хүсэлт илгээх"}
        </Button>
      </div>
      <SuccessModal open={showSuccess} onClose={handleSuccessClose} />
    </>
  );
};
export default LeaveRequestForm;
