import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        <Label htmlFor="username">Нэр, Овог</Label>
        <Input
          id="username"
          value={username}
          onChange={(e) => usernameChange(e.target.value)}
          placeholder="Энд бичих..."
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="username">Албан тушаал</Label>
        <Input
          id="position"
          value={position}
          onChange={(e) => positionChange(e.target.value)}
          placeholder="Энд бичих..."
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="username">Имэйл</Label>
        <Input
          id="email"
          value={email}
          onChange={(e) => emailChange(e.target.value)}
          placeholder="Энд бичих..."
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Ажилд орсон огноо</Label>
        <Input
          id="email"
          value={email}
          onChange={(e) => emailChange(e.target.value)}
          placeholder="Энд бичих..."
        />
      </div>
    </div>
  );
};
export default AddEmployeeForm;
