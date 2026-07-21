import { Plus } from "lucide-react";
import { Button } from "../../ui/button";

const StaffListMain = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-semibold leading-7 tracking-[-2.5%]">
          Нийт ажилчид
        </h4>
        <div className="flex gap-7">
          <Button className="py-5 px-4 gap-2">
            <Plus className="size-4" />
            <p className="text-sm font-medium leading-5 tracking-normal text-primary-foreground">
              Шинэ ажилтан бүртгэх
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default StaffListMain;
