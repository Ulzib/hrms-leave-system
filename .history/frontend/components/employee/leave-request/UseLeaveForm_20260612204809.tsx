"use client";

import api from "@/lib/axios";
import { INITIAL_FORM } from "@/lib/constants";
import { LeaveBalance, LeaveFormData, Manager, RequestType } from "@/lib/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const buildDateTime = (date: string, time: string) => {
  return `${date}T${time}:00+08:00`;
};

const useLeaveForm = () => {
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
  return {
    form,
    requestTypes,
  };
};
export default useLeaveForm;
