// components/employee/LeaveBalanceCards.tsx
"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Card, CardContent } from "@/components/ui/card";

interface LeaveBalance {
  totalDays: number;
  usedDays: number;
}

const LeaveBalanceCards = () => {
  const [balance, setBalance] = useState<LeaveBalance | null>(null);

  // user-ийн үлдсэн чөлөөний мэдээлэл авах
  useEffect(() => {
    const fetchBalance = async () => {
      const res = await api.get("/auth/me");
      setBalance(res.data.user);
    };
    fetchBalance();
  }, []);

  const remainingDays = balance ? balance.totalDays - balance.usedDays : 0;

  return (
    <div className="flex gap-4">
      <Card className="flex-1">
        <CardContent className="pt-4">
          <p className="text-sm text-muted-foreground">Зайнаас ажиллах</p>
          <p className="text-2xl font-semibold">{remainingDays} хоног</p>
          <p className="text-xs text-muted-foreground">боломжтой байна.</p>
        </CardContent>
      </Card>

      <Card className="flex-1">
        <CardContent className="pt-4">
          <p className="text-sm text-muted-foreground">Цалинтай чөлөө</p>
          <p className="text-2xl font-semibold">{remainingDays} хоног</p>
          <p className="text-xs text-muted-foreground">боломжтой байна.</p>
        </CardContent>
      </Card>

      <Card className="flex-1">
        <CardContent className="pt-4">
          <p className="text-sm text-muted-foreground">Чөлөо</p>
          <p className="text-2xl font-semibold">
            {balance?.usedDays ?? 0} цагийн
          </p>
          <p className="text-xs text-muted-foreground">Чөлөө авсан байна.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveBalanceCards;
