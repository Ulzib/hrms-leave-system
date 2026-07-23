"use client";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/lib/axios";
import { useEffect, useState } from "react";

interface LeaveBalance {
  name: string;
  limit: number;
  used: number;
  remaining: number;
}

const Cards = () => {
  const [balance, setBalance] = useState<LeaveBalance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await api.get("/leave/balance");
        console.log("balance data:", res.data);
        setBalance(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBalance();
  }, []);

  if (loading) {
    return (
      <div className="flex gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 max-w-52 h-28 border border-[#E4E4E7] shadow-sm rounded-xl bg-muted animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {balance.map((item) => (
        <Card key={item.name} className="flex-1 shadow-sm">
          <p className="text-sm font-medium leading-5 tracking-normal px-6">
            {item.name}
          </p>
          <CardContent className="px-6">
            <h4 className="text-xl font-semibold leading-7 tracking-[-2.5%]">
              {item.remaining} хоног
            </h4>
            <p className="text-xs font-normal leading-4 tracking-normal text-[#71717A]">
              боломжтой байна.
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default Cards;
