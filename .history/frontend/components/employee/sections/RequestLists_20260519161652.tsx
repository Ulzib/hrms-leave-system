"use client";

import { Card } from "@/components/ui/card";
import api from "@/lib/axios";
import { Calendar, TagIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface LeaveRequest {
  id: number;
  days: number;
  startDate: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  requestType: { name: string };
}

const getStatusLabel = (status: string) => {
  if (status === "PENDING") return "Хүлээгдэж байна";
  if (status === "APPROVED") return "Баталгаажсан";
  return "Татгалзсан";
};

const getStattusColor = (status: string) => {
  if (status === "PENDING") return "bg-orange-100 text-orange-600";
  if (status === "APPROVED") return "bg-green-100 text-green-600";
  return "bg-red-100 text-red-600";
};

const RequestLists = () => {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await api.get("/leaves/my-request");
        setLeaves(res.data);
        setLoading(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, []);
  return (
    <div className="flex flex-col gap-2">
      {/* {leaves.map((leave) => ( */}
      <Card className="flex-1 shadow-sm border p-6 rounded-lg">
        <div className="flex flex-col gap-2 ">
          <div className="flex gap-1.5">
            <TagIcon />
            <p>Чөлөө (1 хоног)</p>
          </div>
          <div className="flex gap-1.5">
            <Calendar />
            2026/05/17
          </div>
        </div>
      </Card>
      {/* // ))} */}
    </div>
  );
};
export default RequestLists;
