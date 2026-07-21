"use client";

const months = [
  "1-р сар",
  "2-р сар",
  "3-р сар",
  "4-р сар",
  "5-р сар",
  "6-р сар",
  "7-р сар",
  "8-р сар",
  "9-р сар",
  "10-р сар",
  "11-р сар",
  "12-р сар",
];

interface MonthProps {
  month: number;
  year: number;
  onChange: (month: number, year: number) => void;
}

const MonthSwitcher = ({ month, year, onChange }: MonthProps) => {
  return <div>hi</div>;
};
export default MonthSwitcher;
