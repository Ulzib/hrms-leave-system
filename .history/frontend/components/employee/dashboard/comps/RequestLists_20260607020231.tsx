"use client";

import { Badge } from "@/components/ui/badge";
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

const getStatusColor = (status: string) => {
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
        const res = await api.get("/leave/my-request");
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

  if (leaves.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center pt-25">
        <p className="text-lg font-bold leading-7 tracking-normal ">
          Чөлөөний хүсэлт алга.
        </p>
        <p className="text-xs font-normal leading-6 tracking-normal space-y-8">
          Чөлөөний хүсэлтээ үүсгэхээр энд харагдана.
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {leaves.map((leave) => {
        const date = new Date(leave.startDate);
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return (
          <div key={leave.id}>
            <p>
              {month}/{day}
            </p>
            <Card className="flex-1 border p-6 rounded-xl">
              <div className="flex flex-col gap-2 ">
                <div className="flex items-center gap-2">
                  <TagIcon className="w-4 h-4 " />
                  <p className="text-sm font-normal leading-5 tracking-normal ">
                    {leave.requestType.name} ({leave.days} хоног)
                  </p>
                  <Badge className={getStatusColor(leave.status)}>
                    {getStatusLabel(leave.status)}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <p className="text-sm font-normal leading-5 tracking-normal ">
                    {new Date(leave.startDate).toLocaleDateString("mn-MN")}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};
export default RequestLists;
