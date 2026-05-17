"use client";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/lib/axios";
import { useEffect, useState } from "react";

interface LeaveBalance {
  totalDays: number;
  usedDays: number;
}

const Cards = () => {
  const [balance, setBalance] = useState<LeaveBalance | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await api.get("/auth/me");
        setBalance(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBalance();
  }, []);

  const remainingDays = (balance?.totalDays ?? 0) - (balance?.usedDays ?? 0);
  return (
    <div className="flex gap-4">
      <Card className="flex-1 shadow-sm">
        <p className="text-sm font-medium leading-5 px-6">Зайнаас ажиллах</p>
        <CardContent className="px-6">
          <h4 className="text-xl font-semibold leading-7">
            {remainingDays} хоног
          </h4>
          <p className="text-xs font-normal leading-4 text-[#71717A]">
            боломжтой байна.
          </p>
        </CardContent>
      </Card>

      <Card className="flex-1 shadow-sm">
        <p className="text-sm font-medium leading-5 px-6">Цалинтай чөлөө</p>
        <CardContent className="px-6">
          <h4 className="text-xl font-semibold leading-7">
            {remainingDays} хоног
          </h4>
          <p className="text-xs font-normal leading-4 text-[#71717A]">
            боломжтой байна.
          </p>
        </CardContent>
      </Card>

      <Card className="flex-1 shadow-sm">
        <p className="text-sm font-medium leading-5 px-6">Чөлөө</p>
        <CardContent className="px-6">
          <h4 className="text-xl font-semibold leading-7">
            {remainingDays} хоног
          </h4>
          <p className="text-xs font-normal leading-4 text-[#71717A]">
            боломжтой байна.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
export default Cards;
