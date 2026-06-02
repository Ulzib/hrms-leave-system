"use client";

import { useEffect, useState } from "react";
import CategoryField from "./Category";
import { LeaveBalance, LeaveFormData, Manager, RequestType } from "@/lib/types";
import { INITIAL_FORM } from "@/lib/constants";
import api from "@/lib/axios";

const LeaveRequestForm = () => {
  const [form, setForm] = useState<LeaveFormData>(INITIAL_FORM);
  const [requestTypes, setRequestTypes] = useState<RequestType[]>([]);
  const [balances, setBalances] = useState<LeaveBalance[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [typesRes, balancesRes, managersRes] = await Promise.all([
        api.get<RequestType[]>("/leave/types"),
        api.get<LeaveBalance[]>("/leave/balance"),
        api.get<Manager[]>("leave/managers"),
      ]);
      setRequestTypes(typesRes.data);
      setBalances(balancesRes.data);
      setManagers(managersRes.data);
    };
    fetchData();
  }, []);

  //ali talbar uurchlugduhud duudagdana
  const handleChange = <K extends keyof LeaveFormData>(
    key: K,
    value: LeaveFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div className="max-w-xl flex flex-col gap-8 border-[#E4E4E7] bg-white rounded-[8px] p-8 shadow-sm">
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
          value={form.requestType}
          requestTypes={requestTypes}
          balances={balances}
          onChange={(val) => handleChange("requestType", val)}
        />
      </div>
    </>
  );
};
export default LeaveRequestForm;
