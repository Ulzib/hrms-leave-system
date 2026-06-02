import { Label } from "@/components/ui/label";

const CategoryField = () => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-center">
        <Label htmlFor="category" className="flex">
          <p className="text-sm font-medium leading-3.5 tracking-normal">
            Ангилал
          </p>
          <p className="font-medium leading-3.5 text-red-600">*</p>
        </Label>
      </div>
    </div>
  );
};
export default CategoryField;
