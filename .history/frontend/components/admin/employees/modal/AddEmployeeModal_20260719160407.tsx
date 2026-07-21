import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import api from "@/lib/axios";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import AddEmployeeForm from "../form/AddEmployeeForm";

interface AddEmpModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddEmployeeModal = ({ open, onClose, onSuccess }: AddEmpModalProps) => {
  const [username, setUsername] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [hiredAt, setHiredAt] = useState<Date | undefined>(undefined);
  const [role, setRole] = useState("EMPLOYEE");
  const [submit, setSubmit] = useState(false);

  const resetForm = () => {
    setUsername("");
    setPosition("");
    setEmail("");
    setHiredAt(undefined);
    setRole("EMPLOYEE");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    if (!username || !position || !email || !hiredAt) {
      toast.error("Бүх талбарыг бөглөнө үү");
      return;
    }

    try {
      setSubmit(true);
      await api.post("/admin/employees", {
        username,
        position,
        email,
        hiredAt: format(hiredAt, "yyyy-MM-dd"),
        role,
      });
      toast.success("Ажилтан амжилттай бүртгэгдлээ");
      onSuccess();
      handleClose();
    } catch (err) {
      console.error(err);
      toast.error("Бүртгэхэд алдаа гарлаа");
    } finally {
      setSubmit(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className=" border-[#E4E4E7] p-8 gap-8 rounded-md">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-2xl font-semibold leading-8 tracking-[-2.5%]">
            Шинэ ажилтан бүртгэх
          </DialogTitle>
          <DialogDescription className="text-sm font-normal leading-5 tracking-normal text-muted-foreground">
            Дараах формыг бөглөж шинэ ажилтны мэдээллийг оруулна уу.
          </DialogDescription>
        </DialogHeader>
        <AddEmployeeForm
          username={username}
          position={position}
          email={email}
          hired={hiredAt}
          role={role}
          usernameChange={setUsername}
          positionChange={setPosition}
          emailChange={setEmail}
          hiredChange={setHiredAt}
          roleChange={setRole}
        />
        <DialogFooter className="bg-white border-none">
          <Button
            variant="outline"
            disabled={submit}
            onClick={handleClose}
            className="py-4 px-6 gap-2 rounded-md hover:bg-gray-200"
          >
            <p className="text-sm font-medium leading-5 tracking-normal">
              Буцах
            </p>
          </Button>
          <Button
            variant="default"
            disabled={submit}
            onClick={handleSubmit}
            className="py-4 px-6 gap-2 rounded-md hover:bg-gray-800/80"
          >
            <p className="text-sm font-medium leading-5 tracking-normal">
              Нэмэх
            </p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddEmployeeModal;
