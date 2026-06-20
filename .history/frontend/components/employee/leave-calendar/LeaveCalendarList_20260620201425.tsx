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
          </div>
        );
      })}
    </div>
  );
};
export default LeaveCalendarList;
