import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import api from "@/lib/axios";
import { useState } from "react";
import { toast } from "sonner";

interface PromoteModalProps {
  open: boolean;
  employeeId: number;
  employeeName: string;
  onClose: () => void;
  onSuccess: () => void;
}

const PromoteModal = ({
  open,
  employeeId,
  employeeName,
  onClose,
  onSuccess,
}: PromoteModalProps) => {
  const [submit, setSubmit] = useState(false);

  const handlePromote = async () => {
    try {
      setSubmit(true);
      await api.post(`/admin/employees/${employeeId}/promote`);
      toast.success("Ажилтныг ахлах ажилтан болголоо");
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Үйлдлийг хийхэд алдаа гарлаа");
    } finally {
      setSubmit(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-lg p-6 gap-4 rounded-md ">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold leading-7 tracking-normal">
            Ахлах ажилтныг баталгаажуулах
          </DialogTitle>
          <DialogDescription className="text-sm font-normal leading-5 tracking-normal">
            Та {employeeName} -ийг ахлах ажилтан болгох гэж байна.
            Баталгаажуулна уу.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default PromoteModal;
