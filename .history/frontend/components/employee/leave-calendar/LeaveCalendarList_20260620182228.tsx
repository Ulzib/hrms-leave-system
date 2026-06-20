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

const LeaveCalendarList = ({ leaves }: LeaveCalendarListProps) => {
  //chuluunuudig "mm/dd" key-r buleglene
  const groupDate: { [key: string]: ApprovedLeave[] } = {};

  return <div>hi</div>;
};
export default LeaveCalendarList;
