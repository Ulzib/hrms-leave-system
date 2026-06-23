export type LeaveType = "hourly" | "daily";
export type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface RequestType {
  id: number;
  name: string;
  limit: number;
  period: "YEARLY" | "MONTHLY";
}

export interface LeaveBalance {
  name: string;
  limit: number;
  used: number;
  remaining: number;
}

export interface Manager {
  id: number;
  username: string;
  role: "HR" | "ADMIN";
}

export interface LeaveFormData {
  requestTypeId: number | null;
  type: LeaveType;
  date: string;
  startTime: string;
  endTime: string;
  managerId: number | null;
  reason: string;
}

//hr,admin pending request paget ashiglah 1 huseltiin info
export interface LeaveRequestItem {
  id: number;
  startDate: string;
  endDate: string;
  days: number;
  user: string;
  requestType: RequestType;
  rejectReason: string;
  status: LeaveStatus;
}
