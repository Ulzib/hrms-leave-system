"use client";

import { Card } from "@/components/ui/card";
import { Clock, TagIcon } from "lucide-react";
import Image from "next/image";

interface ApprovedLeave {
  id: number;
  startDate: string;
  endDate: string;
  days: number;
  user: {
    id: number;
    username: string;
    profilePicture: string | null;
  };
  requestType: {
    name: string;
  };
}

interface LeaveCalendarListProps {
  leaves: ApprovedLeave[];
}

const getDayLabel = (dateStr: string) => {
  const date = new Date(dateStr);
  const today = new Date();

  const diffMs = today.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Өнөөдөр";
  if (diffDays === 1) return "Өчигдөр";
  if (diffDays === 2) return "Уржигдар";
  return null;
};

const LeaveCard = ({ leave }: { leave: ApprovedLeave }) => {
  return (
    <div className="flex bg-white border gap-4 px-6 py-5 rounded-xl">
      <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 shrink-0">
        {leave.user.profilePicture ? (
          <Image
            src={leave.user.profilePicture}
            alt={leave.user.username}
            width={36}
            height={36}
            className="object-cover w-full h-full"
          />
        ) : (
          // imagegui bol neriin ehnii usgiig haruulna
          <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 text-sm font-medium">
            {leave.user.username.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* ner,tsag, leave type */}
      <div className="flex flex-col gap-1 flex-1">
        <p className="text-sm font-medium">{leave.user.username}</p>

        <div className="flex items-center gap-4">
          {/* chuluunii tsag */}
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs">09:00 - 18:00</span>
          </div>

          {/* type, days */}
          <div className="flex items-center gap-1 text-muted-foreground">
            <TagIcon className="w-3.5 h-3.5" />
            <span className="text-xs">
              {leave.requestType.name} ({leave.days} хоног)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const LeaveCalendarList = ({ leaves }: LeaveCalendarListProps) => {
  //chuluunuudig "mm/dd" key-r buleglene
  const groupedDate: { [key: string]: ApprovedLeave[] } = {};

  leaves.forEach((leave) => {
    const date = new Date(leave.startDate);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const key = `${month}/${day}`;

    if (!groupedDate[key]) {
      groupedDate[key] = [];
    }
    groupedDate[key].push(leave);
  });

  //udruudiig buurhaar erembelne
  const sortDates = Object.keys(groupedDate).sort((a, b) => {
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
  });
  return (
    <div>
      {sortDates.map((dateKey) => {
        const dayLeaves = groupedDate[dateKey];
        const label = getDayLabel(dayLeaves[0].startDate);
        return (
          <div key={dateKey} className="flex flex-col gap-2">
            <div className="flex flex-col items-center gap-2">
              <p className="text-base font-medium">{dateKey}</p>
              {label && (
                <p className="text-sm text-muted-foreground">{label}</p>
              )}
            </div>

            {/* tuhain udriin carduud*/}
            <div className="flex flex-col gap-2">
              {dayLeaves.map((leave) => (
                <LeaveCard key={leave.id} leave={leave} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default LeaveCalendarList;
