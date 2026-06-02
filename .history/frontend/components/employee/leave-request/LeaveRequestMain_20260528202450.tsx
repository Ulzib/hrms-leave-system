import { useState } from "react";
import CategoryField from "./Category";
import { LeaveBalance, LeaveFormData } from "@/lib/types";
import { INITIAL_FORM } from "@/lib/constants";

const LeaveRequestForm = () => {
  const [form, setForm] = useState<LeaveFormData>(INITIAL_FORM);
  const [balances, setBalances] = useState<LeaveBalance[]>([]);
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
          value={form.requestTypes}
          requestTypes={requestTypes}
          balances={balances}
          onChange={(val) => handleChange("requestTypesId", val)}
        />
      </div>
    </>
  );
};
export default LeaveRequestForm;
