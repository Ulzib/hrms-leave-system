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

  const fetchPromote = async()=>{
    try{
        setSubmit(true)
        await api.post(`/admin/employees/${employeeId}/promote`)
        toast.success("")
    }
  }

  return <div>hi</div>;
};
export default PromoteModal;
