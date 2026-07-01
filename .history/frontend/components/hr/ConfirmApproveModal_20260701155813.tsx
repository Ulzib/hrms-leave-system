"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import api from "@/lib/axios";
import { toast } from "sonner";

interface ApproveModalProps {
  open: boolean;
  requestId: number;
  onClose: () => void;
  onSuccess: () => void; //req ee amjilttai blsni dra duudna, list refresh blno
}

const ConfirmApproveModal = ({
  open,
  requestId,
  onClose,
  onSuccess,
}: ApproveModalProps) => {
  //api duudaj bgag savelene, true bl button disabled blno
  const [submit, setSubmit] = useState(false);

  const handleApprove = async () => {
    try {
      setSubmit(true);
      await api.patch(`/leave/${requestId}/status`, {
        status: "APPROVED",
      });
      toast.success("Хүсэлтийг зөвшөөрлөө");
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Зөвшөөрөхөд алдаа гарлаа");
    } finally {
      setSubmit(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-lg p-6 gap-4 divide-none">
        <DialogHeader>
          <DialogTitle>Та итгэлтэй байна уу?</DialogTitle>
          <DialogDescription>
            Чөлөөний хүсэлтийг зөвшөөрснөөр тухайн ажилтан руу хүсэлт нь
            баталгаажсан гэсэн мессеж Teams Chat -аар очно.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-white">
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
            onClick={handleApprove}
            className="py-2 px-4 gap-2 rounded-md hover:bg-gray-800/80"
          >
            <p className="text-sm font-medium leading-5 tracking-normal ">
              Зөвшөөрөх
            </p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ConfirmApproveModal;
