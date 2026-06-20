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

const LeaveCalendarList = ({ leaves }: LeaveCalendarListProps) => {
  return <div>hi</div>;
};
export default LeaveCalendarList;
