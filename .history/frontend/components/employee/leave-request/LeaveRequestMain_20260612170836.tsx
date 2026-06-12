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

const buildDateTime = (date: string, time: string) => {
  return `${date}T${time}:00+08:00`;
};
const LeaveRequestForm = () => {
  const [form, setForm] = useState<LeaveFormData>(INITIAL_FORM);
  const [requestTypes, setRequestTypes] = useState<RequestType[]>([]);
  const [balances, setBalances] = useState<LeaveBalance[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typesRes, balancesRes, managersRes] = await Promise.all([
          api.get<RequestType[]>("/leave/types"),
          api.get<LeaveBalance[]>("/leave/balance"),
          api.get<Manager[]>("/leave/managers"),
        ]);
        setRequestTypes(typesRes.data);
        setBalances(balancesRes.data);
        setManagers(managersRes.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();
  }, []);
  //ali talbar uurchlugduhud ter ued n duudagdana
  const handleChange = <K extends keyof LeaveFormData>(
    key: K,
    value: LeaveFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };
  //tsag,udrin turluus hamaaran start/endDate tootsood POST hiine
  const handleSubmit = async () => {
    if (!form.requestTypeId || !form.type || !form.managerId) return;
    const startDate = buildDateTime(
      form.date,
      form.type === "hourly" ? form.startTime : "00:00",
    );
    const endDate = buildDateTime(
      form.date,
      form.type === "hourly" ? form.endTime : "23:59",
    );
    try {
      setLoading(true);
      await api.post("/leave", {
        requestTypeId: form.requestTypeId,
        managerId: form.managerId,
        startDate,
        endDate,
        reason: form.reason,
      });
      setShowSuccess(true);
    } catch (err) {
      toast.error("Хүсэлт илгээх явцад алдаа гарлаа");
      console.error("Алдаа гарлаа: ", err);
    } finally {
      setLoading(false);
    }
  };
  //modal haah, form tseverlene
  const handleSuccessClose = () => {
    setShowSuccess(false);
    setForm(INITIAL_FORM);
  };
  //zaaval bugluh talbaruud dutuu bol button idevhgui
  const isSubmitDisabled =
    !form.requestTypeId ||
    !form.date ||
    !form.managerId ||
    !form.reason ||
    loading;

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
