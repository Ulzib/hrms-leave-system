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

interface AddEmpModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddEmployeeModal = ({ open, onClose, onSuccess }: AddEmpModalProps) => {
  const [username, setUsername] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [hired, setHired] = useState<Date | undefined>(undefined);
  const [role, setRole] = useState("EMPLOYEE");
  const [submit, setSubmit] = useState(false);

  const resetForm = () => {
    setUsername("");
    setPosition("");
    setEmail("");
    setHired(undefined);
    setRole("EMPLOYEE");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    if (!username || !position || !email || !hired) {
      toast.error("Бүх талбарыг бөглөнө үү");
      return;
    }

    try {
      setSubmit(true);
      await api.post("/admin/employees", {
        username,
        position,
        email,
        hired: format(hired, "yyyy-MM-dd"),
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Шинэ ажилтан бүртгэх</DialogTitle>
          <DialogDescription>
            Дараах формыг бөглөж шинэ ажилтны мэдээллийг оруулна уу.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-white border-none">
          <Button>Буцах</Button>
          <Button>Нэмэх</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddEmployeeModal;
