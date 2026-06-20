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

const getDate = (dateDtr: string) => {
  const date = new Date(dateDtr);
  const today = new Date();

  const difMs = today.getTime() - date.getTime();
  const difDays = Math.floor(difMs / (1000 * 60 * 60 * 24));

  if (difDays === 0) return "Өнөөдөр";
  if (difDays === 1) return "Өчигдөр";
  if (difDays === 2) return "Уржигдар";
  return null;
};

const LeaveCalendarList = ({ leaves }: LeaveCalendarListProps) => {
  return <div>hi</div>;
};
export default LeaveCalendarList;
