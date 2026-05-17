import PineIcon from "../svg/PineIcon";
import ToggleIcon from "../svg/ToggleIcon";
import SelectDemo from "./NavSelect";

const Navbar = () => {
  return (
    <div className="w-full h-auto flex flex-col border border-[#E4E4E7] py-4 px-6 gap-3">
      <div className="flex">
        <PineIcon />
        <SelectDemo />
      </div>
      <div>
        <ToggleIcon />
        <Image></Image>
      </div>
    </div>
  );
};
export default Navbar;
