import { useState } from "react";

const READ_REQ_IDS_KEY = "hr-read-request-ids";

//Ajiltan ali reqiig nej uzsn esehiig localstorage-d hadgalj,unread badge haruulahad ashiglana
export const useReadRequestIds = () => {
  const [readReqIds, setReadReqIds] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(READ_REQ_IDS_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  }); //click neej uzsen req id-g end savelene

  const markRead = (id: number) => {
    if (readReqIds.includes(id)) return;

    const updateIds = [...readReqIds, id];
    setReadReqIds(updateIds);
    localStorage.setItem(READ_REQ_IDS_KEY, JSON.stringify(updateIds));
  };
  return { readReqIds, markRead };
};

const StatusFilterDropDown = () => {
  return <div>hi</div>;
};
export default StatusFilterDropDown;
