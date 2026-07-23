"use client";

import api from "@/lib/axios";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";

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
      await api.patch(`/leave/${requestId}/status`, {
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
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-lg p-6 gap-4 divide-none">
        <DialogHeader>
          <DialogTitle>Татгалзсан шалтгаан</DialogTitle>
          <DialogDescription>
            Тухайн ажилтанд яагаад татгалзаж байгаагаа тайлбарлан бичнэ үү.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Энд бичнэ үү"
          className="min-h-32"
        />
        <DialogFooter className="bg-white dark:bg-neutral-900">
          <Button
            variant="outline"
            disabled={submit}
            onClick={onClose}
            className="py-2 px-4 gap-2 rounded-md hover:bg-gray-200"
          >
            <p className="text-sm font-medium leading-5 tracking-normal">
              Буцах
            </p>
          </Button>
          <Button
            disabled={submit}
            onClick={handleReject}
            className="py-2 px-4 gap-2 rounded-md hover:bg-gray-800/80"
          >
            <p className="text-sm dark:bg-gray-200 darfont-medium leading-5 tracking-normal ">
              Илгээх
            </p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default RejectReasonModal;
