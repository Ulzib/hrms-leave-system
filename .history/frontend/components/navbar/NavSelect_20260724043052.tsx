import SelectIcon from "../svg/SelectIcon";

const SelectDemo = () => {
  return (
    <div className="flex items-center max-w-44 h-auto border border-border py-1 px-3 gap-3 rounded-md dark:bg-neutral-700">
      <p className="text-sm dark:text-gray-200 font-medium leading-5 text-[#09090B]">
        Leave Request
      </p>
      <SelectIcon />
    </div>
  );
};
export default SelectDemo;
