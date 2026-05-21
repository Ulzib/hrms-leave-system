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
    <div className="w-full h-auto flex flex-col border border-[#E4E4E7] py-3.5 px-6 gap-3">
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
          className={`relative pb-3 text-sm font-medium leading-5 tracking-normal transition-colors ${
            isActive("/employee-dashboard")
              ? "text-black"
              : "text-gray-500 hover:text-black"
          }`}
        >
          My requests
          {isActive("/employee-dashboard") && (
            // -bottom-[1px] нь наббарын үндсэн border-b дээр яг тааруулж өгнө
            <span className="absolute -bottom-[1px] left-0 w-full h-0.5 bg-black"></span>
          )}
        </Link>
        <Link
          href="leave-request"
          className="relative text-sm font-medium leading-5 tracking-normal"
        >
          Request Form
          {isActive("/leave-request") && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>
          )}
        </Link>
        <Link href="" className="text-sm font-medium leading-5 tracking-normal">
          Leave Calendar
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
