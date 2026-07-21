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
      <DialogContent className=" border-[#E4E4E7] p-8 gap-8 rounded-md">
        <DialogHeader className="gap-1.5">
          <DialogTitle>Шинэ ажилтан бүртгэх</DialogTitle>
          <DialogDescription>
            Дараах формыг бөглөж шинэ ажилтны мэдээллийг оруулна уу.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-white border-none">
          <Button
            variant="outline"
            disabled={submit}
            onClick={handleClose}
            className="py-2 px-4 gap-2 rounded-md hover:bg-gray-200"
          >
            <p>Буцах</p>
          </Button>
          <Button
            variant="default"
            disabled={submit}
            onClick={handleSubmit}
            className="py-2 px-4 gap-2 rounded-md hover:bg-gray-800/80"
          >
            <p>Нэмэх</p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddEmployeeModal;
