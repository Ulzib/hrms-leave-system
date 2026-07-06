"use client";

import { useEffect, useState } from "react";
import { LeaveRequestItem } from "./PendingRequestsList";

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
  const [readReqIds, setReadReqIds] = useState<number[]>(() => {
    if (typeof window !== "undefined") return [];
    const saved = localStorage.getItem(READ_REQ_IDS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const markRead = (id: number) => {
    const alreadyRead = readIds;
    if (readReqIds.includes(id)) const updateIds = [...readReqIds, id];
    setReadReqIds(updateIds);
    localStorage.setItem(READ_REQ_IDS_KEY, JSON.stringify(updateIds));
  };
  return { readReqIds, markRead };
};

const StatusFilterDropDown = () => {
  return <div>hi</div>;
};
export default StatusFilterDropDown;
