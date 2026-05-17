import Image from "next/image";
import PineIcon from "../svg/PineIcon";
import ToggleIcon from "../svg/ToggleIcon";
import SelectDemo from "./NavSelect";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full h-auto flex flex-col border border-[#E4E4E7] py-4 px-6 gap-3">
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
        <Link href="">My requests</Link>
        <Link href="">Request Form</Link>
        <Link href="">Leave Calendar</Link>
      </div>
    </div>
  );
};
export default Navbar;
