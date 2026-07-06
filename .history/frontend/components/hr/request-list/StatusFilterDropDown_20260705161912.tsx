"use client";

import { useEffect, useState } from "react";
import { LeaveRequestItem } from "./PendingRequestsList";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export type StatusValue = "APPROVED" | "PENDING" | "REJECTED";
export type StatusCounts = Record<StatusValue, number>;

//filter jarsaaltad haragdah 3 tuluv
const STATUS_OPS: { value: StatusValue; label: string }[] = [
  { value: "APPROVED", label: "Баталгаажсан" },
  { value: "PENDING", label: "Хүлээгдэж байна" },
  { value: "REJECTED", label: "Татгалзсан" },
];

const READ_REQ_IDS_KEY = "hr-read-request-ids";

//Ajiltan ali reqiig neej uzsn esehiig localstorage-d hadgalj,unread badge haruulahad ashiglana
export const useReadRequestIds = () => {
  const [readIds, setReadIds] = useState<number[]>(() => {
    if (typeof window !== "undefined") return [];
    const saved = localStorage.getItem(READ_REQ_IDS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const markRead = (id: number) => {
    const alreadyRead = readIds.includes(id);
    if (!alreadyRead) {
      const updateIds = [...readIds, id];
      setReadIds(updateIds);
      localStorage.setItem(READ_REQ_IDS_KEY, JSON.stringify(updateIds));
    }
  };
  return { readIds, markRead };
};

interface StatusFilterDropDownProps {
  selectedStatuses: StatusValue[];
  onChange: (statuses: StatusValue[]) => void;
  counts: StatusCounts;
}

const StatusFilterDropDown = ({
  selectedStatuses,
  onChange,
  counts,
}: StatusFilterDropDownProps) => {
  const toggleStatus = (value: StatusValue) => {
    if (selectedStatuses.includes(value)) {
      onChange(selectedStatuses.filter((s) => s !== value));
    } else {
      onChange([...selectedStatuses, value]);
    }
  };

  //button dr haruulah badge. 2s deesh songovol N gj bichne
  let selectLabel = null;
  if (selectedStatuses.length > 2) {
    selectLabel = (
      <Badge variant="secondary" className="rounded-md font-normal">
        {selectedStatuses.length} сонгогдсон
      </Badge>
    );
  } else if (selectedStatuses.length > 0) {
    const selectedOps = STATUS_OPS.filter((op) =>
      selectedStatuses.includes(op.value),
    );
    selectLabel = (
      <div className="flex gap-1">
        {selectedOps.map((op) => (
          <Badge
            key={op.value}
            variant="secondary"
            className="rounded-md font-normar"
          >
            {op.label}
          </Badge>
        ))}
      </div>
    );
  }
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="border-[#E4E4E7] border-dashed py-2.5 px-3 gap-2 rounded-md bg-[#FFFFFF] text-black">
            <PlusCircle className="size-4" />
            <p className="text-sm font-medium leading-5 tracking-normal">
              Төлөв
            </p>
          </Button>
        </PopoverTrigger>
      </Popover>
    </div>
  );
};
export default StatusFilterDropDown;
