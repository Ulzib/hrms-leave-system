import { Label } from "@/components/ui/label";

const CategoryField = () => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-center">
        <Label htmlFor="category" className="flex">
          Ангилал
          <p>*</p>
        </Label>
      </div>
    </div>
  );
};
export default CategoryField;
