import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import HiredDatePicker from "../../filters/HiredDatePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddEmpFormProps {
  username: string;
  position: string;
  email: string;
  hired: Date | undefined;
  role: string;
  usernameChange: (value: string) => void;
  positionChange: (value: string) => void;
  emailChange: (value: string) => void;
  hiredChange: (value: Date | undefined) => void;
  roleChange: (value: string) => void;
}

const AddEmployeeForm = ({
  username,
  position,
  email,
  hired,
  role,
  usernameChange,
  positionChange,
  emailChange,
  hiredChange,
  roleChange,
}: AddEmpFormProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="username"
          className="text-sm font-medium leading-3.5 tracking-normal"
        >
          Нэр, Овог
        </Label>
        <Input
          id="username"
          value={username}
          onChange={(e) => usernameChange(e.target.value)}
          placeholder="Энд бичих..."
          className="text-sm font-normal leading-5 tracking-normal border-[#E4E4E7] p-4 rounded-md "
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="username"
          className="text-sm font-medium leading-3.5 tracking-normal"
        >
          Албан тушаал
        </Label>
        <Input
          id="position"
          value={position}
          onChange={(e) => positionChange(e.target.value)}
          placeholder="Энд бичих..."
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="username"
          className="text-sm font-medium leading-3.5 tracking-normal"
        >
          Имэйл
        </Label>
        <Input
          id="email"
          value={email}
          onChange={(e) => emailChange(e.target.value)}
          placeholder="Энд бичих..."
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium leading-3.5 tracking-normal">
          Ажилд орсон огноо
        </Label>
        <HiredDatePicker value={hired} onChange={hiredChange} />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium leading-3.5 tracking-normal">
          Эрхийг тохируулах
        </Label>
        <Select value={role} onValueChange={roleChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Сонгох" />
          </SelectTrigger>
          <SelectContent position="popper" sideOffset={4}>
            <SelectItem value="HR">Ахлах ажилтан болгох</SelectItem>
            <SelectItem value="EMPLOYEE">Ажилтан болгох</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
export default AddEmployeeForm;
