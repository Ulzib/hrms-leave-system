"use client";

import { useEffect, useState } from "react";
import CategoryField from "./Category";
import { LeaveBalance, LeaveFormData, Manager, RequestType } from "@/lib/types";
import { INITIAL_FORM } from "@/lib/constants";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

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
          api.get<RequestType[]>("/leaves/types"),
          api.get<LeaveBalance[]>("/leaves/balance"),
          api.get<Manager[]>("/leaves/managers"),
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
          value={form.requestTypeId}
          requestTypes={requestTypes}
          balances={balances}
          onChange={(val) => handleChange("requestTypeId", val)}
        />

        <Button className="left-0">
          <Send />
          {loading ? "Илгээж байна..." : "Хүсэлт илгээх"}
        </Button>
      </div>
    </>
  );
};
export default LeaveRequestForm;
