"use client";

import Image from "next/image";
import PineIcon from "../svg/PineIcon";
import ToggleIcon from "../svg/ToggleIcon";
import SelectDemo from "./NavSelect";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  //hr,admin
  const adminLink = user?.role === "ADMIN";
  const hrPendingReqs = user?.role === "HR";
  const staffLinks = user?.role === "HR" || user?.role === "EMPLOYEE";

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const linkClass = (path: string) => {
    let className =
      "text-center text-sm font-medium leading-5 tracking-normal pb-3 -mb-2.5";
    if (isActive(path)) {
      className += " border-gray-600";
    }
    return className;
  };

  return (
    <div className="sticky top-0 left-0 z-50 w-full h-auto flex flex-col  border-[#E4E4E7] py-3.5 px-6 gap-3 border-b bg-white">
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
        {adminLink && (
          <Link
            href="/admin-dashboard"
            className={linkClass("/admin-dashboard")}
          >
            Ажилчдын жагсаалт
          </Link>
        )}
        {hrPendingReqs && (
          <Link href="/leaves" className={linkClass("/leaves")}>
            Pending Requests
          </Link>
        )}
        {staffLinks ?? (
          <>
            <Link
              href="/employee-dashboard"
              className={linkClass("/employee-dashboard")}
            >
              My requests
            </Link>
            <Link href="/leave-request" className={linkClass("/leave-request")}>
              Request Form
            </Link>
            <Link
              href="/leave-calendar"
              className={linkClass("/leave-calendar")}
            >
              Leave Calendar
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
