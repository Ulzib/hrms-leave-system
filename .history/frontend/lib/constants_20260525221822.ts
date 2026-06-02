import { LeaveFormData } from "./types";

export const TIME_OPTION = Array.from({ length: 24 }, (_, i) => {
  const aa = String(i).padStart(2, "0");
  return { value: `${aa}:00`, label: `${aa}:00` };
});

export const INITIAL_FORM: LeaveFormData = {
  requestTypeId: null,
  type: "hourly",
  date: "",
  startTime,
};
