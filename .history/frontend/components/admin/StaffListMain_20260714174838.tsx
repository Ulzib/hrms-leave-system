import { Plus } from "lucide-react";
import { Button } from "../ui/button";

const StaffListMain = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-semibold leading-7 tracking-[-2.5%]">
          Нийт ажилчид
        </h4>
        <div className="flex gap-7">
          <Button className="py-2 px-4">
            <Plus className="size-4" />
            Шинэ ажилтан бүртгэх
          </Button>
        </div>
      </div>
    </div>
  );
};
export default StaffListMain;
