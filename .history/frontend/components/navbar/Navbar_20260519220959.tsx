"use client";

import Image from "next/image";
import PineIcon from "../svg/PineIcon";
import ToggleIcon from "../svg/ToggleIcon";
import SelectDemo from "./NavSelect";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };
  console.log(pathname);
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
        <Link href="" className="text-sm font-medium leading-5 tracking-normal">
          My requests
        </Link>
        <Link href="" className="text-sm font-medium leading-5 tracking-normal">
          Request Form
        </Link>
        <Link href="" className="text-sm font-medium leading-5 tracking-normal">
          Leave Calendar
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
