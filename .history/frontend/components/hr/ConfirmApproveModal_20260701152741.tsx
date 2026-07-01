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

  const handleSubmit = async () => {
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
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Та итгэлтэй байна уу?</DialogTitle>
          <DialogDescription>
            Чөлөөний хүсэлтийг зөвшөөрөхөөр зайлшгуй акшилтай хүсэлт нь
            батлагдсан гэж мессеж Teams Chat-аар очно.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Буцах</Button>
          <Button>Зөвшөөрөх</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ConfirmApproveModal;
