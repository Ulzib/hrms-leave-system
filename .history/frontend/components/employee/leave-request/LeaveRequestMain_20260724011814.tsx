"use client";

import CategoryField from "./Category";

import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

import LeaveTypeField from "./LeaveType";
import DateField from "./DateComp";
import TimeRange from "./TimeRange";
import ManagerComboBox from "./ManagerConfirm";
import ReasonInput from "./ReasonInput";
import SuccessModal from "./SuccessModal";
import useLeaveForm from "./UseLeaveForm";
import FileUpload from "./FileUpload";

const LeaveRequestForm = () => {
  const {
    form,
    requestTypes,
    balances,
    managers,
    loading,
    showSuccess,
    file,
    isRemoteWork,
    isSubmitDisabled,
    handleChange,
    handleSubmit,
    handleSuccessClose,
    setFile,
  } = useLeaveForm();
  return (
    <>
      <div className="w-full relative flex flex-col gap-8 bg-white dark:bg-neutral-900 rounded-[8px] p-8 shadow-sm ">
        <div className="mb-1">
          <h3 className="text-2xl dark:text-gray-200 font-semibold leading-8 tracking-[-2.5%] ">
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
            {!isRemoteWork && (
              <LeaveTypeField
                value={form.type}
                onChange={(val) => handleChange("type", val)}
              />
            )}
            <DateField
              value={form.date}
              onChange={(val) => handleChange("date", val)}
              label={isRemoteWork ? "Зайнаас ажиллах өдөр" : undefined}
            />
            {form.type === "hourly" && !isRemoteWork && (
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
              label={isRemoteWork ? "Зайнаас ажиллах шалтгаан" : undefined}
            />
            {isRemoteWork && <FileUpload file={file} onChange={setFile} />}
          </>
        )}

        <Button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className="ml-auto text-sm dark:bg-gray-900 font-medium leading-5 tracking-normal py-5 px-4 gap-2 rounded-md text-[#FAFAFA]"
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
