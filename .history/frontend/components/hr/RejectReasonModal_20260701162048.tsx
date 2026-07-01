"use client";

import api from "@/lib/axios";
import { useState } from "react";
import { toast } from "sonner";

interface RejectReasonModalProps {
  open: boolean;
  requestId: number;
  onClose: () => void;
  onSuccess: () => void;
}

const RejectReasonModal = ({
  open,
  requestId,
  onClose,
  onSuccess,
}: RejectReasonModalProps) => {
  const [reason, setReason] = useState("");
  const [submit, setSubmit] = useState(false);

  const handleReject = async () => {
    if (!reason.trim()) {
      toast.error("Татгалзах шалтгаанаа оруулна уу");
      return;
    }

    try {
      setSubmit(true);
      await api.put(`/leave/${requestId}/status`, {
        status: "REJECTED",
        rejectReason: reason,
      });
      toast.success("Хүсэлтийг татгалзлаа");
      onSuccess();
      onClose();
      setReason("");
    } catch (err) {
      console.error(err);
      toast.error("Татгалзахад алдаа гарлаа");
    } finally {
      setSubmit(false);
    }
  };
  return <div>hi</div>;
};
export default RejectReasonModal;
