"use client";

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

const getDays = (dateStr: string) => {
  const date = new Date(dateStr);
  const today = new Date();

  const diffMs = today.getTime() - date.getTime();
  const diffDays = diffMs / Math.floor(1000 * 60 * 60 * 24);
  if (diffDays === 0) return "Өнөөдөр";
  if (diffDays === 1) return "Өчигдөр";
  if (diffDays === 2) return "Уржигдар";
  return null;
};

const LeaveCalendarList = ({ leaves }: LeaveCalendarListProps) => {
  return <div>hi</div>;
};
export default LeaveCalendarList;
