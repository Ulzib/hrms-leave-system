import { Card } from "@/components/ui/card";
import { TagIcon } from "lucide-react";
import { useState } from "react";

interface LeaveRequest {
  id:number;
  days:number;
  startDate:string;
  status: "APPROVED"|"PENDING" |""
}

const RequestLists = () => {
  const [leaves, setLeaves]=useState<>([])
  return (
    <div className="flex flex-col gap-2">
      <Card className="flex-1 shadow-sm">
        <div>
          <TagIcon />
          <p></p>
        </div>
      </Card>
    </div>
  );
};
export default RequestLists;
