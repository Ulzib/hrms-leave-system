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
  return <div>hi</div>;
};
export default AddEmployeeForm;
