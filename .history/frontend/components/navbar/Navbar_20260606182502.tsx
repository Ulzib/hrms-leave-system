"use client";

import Image from "next/image";
import PineIcon from "../svg/PineIcon";
import ToggleIcon from "../svg/ToggleIcon";
import SelectDemo from "./NavSelect";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="sticky top-0 z-50 w-full h-auto flex flex-col  border-[#E4E4E7] py-3.5 px-6 gap-3 border-b bg-white">
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <PineIcon />
          <SelectDemo />
        </div>
        <div className="flex items-center gap-2.5">
          <ToggleIcon />
          <Image src="/Avatar.png" alt="Avatar" width={36} height={36} />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Link
          href="/employee-dashboard"
          className={`text-sm font-medium leading-5 tracking-normal pb-3 -mb-3.5 ${
            isActive("/employee-dashboard") ? "border-b-2 border-gray-600" : ""
          }`}
        >
          My requests
        </Link>
        <Link
          href="/leave-request"
          className={`text-sm font-medium leading-5 tracking-normal pb-3 -mb-3.5 ${isActive("/leave-request") ? "border-b-2 border-gray-600" : ""}`}
        >
          Request Form
        </Link>
        <Link
          href="/leave-calendar"
          className={`text-sm font-medium leading-5 tracking-normal pb-3 -mb-3.5 ${isActive("/leave-calendar") ? "border-b-2 border-gray-600" : ""}`}
        >
          Leave Calendar
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
