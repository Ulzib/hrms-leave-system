"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface LeaveBalance {
  totalDays: number;
  usedDays: number;
}

const Cards = () => {
  const [balance, setBalance] = useState<LeaveBalance | null>(null);

  const remainingDays = balance ? balance.totalDays - balance.usedDays : 0;
  return (
    <div className="flex gap-4">
      <Card className="">
        <CardContent>
          <p>Зайнаас ажиллах</p>
          <p>{remainingDays} хоног</p>
          <p>боломжтой байна.</p>
        </CardContent>
      </Card>
    </div>
  );
};
export default Cards;
