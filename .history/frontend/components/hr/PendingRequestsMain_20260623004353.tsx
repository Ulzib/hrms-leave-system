"use client";

import { useState } from "react";
import { Input } from "../ui/input";

const PendingRequestsMain = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-xl font-semibold leading-7 tracking-[-2.5%]">
        Хүсэлтүүд
      </h4>
      <div className="flex justify-between">
        <div>
          <Input
            placeholder="Хайх"
            value={search}
            className="ring-0 focus:ring-0 focus:outline-none text-sm "
          />
        </div>
      </div>
    </div>
  );
};
export default PendingRequestsMain;
