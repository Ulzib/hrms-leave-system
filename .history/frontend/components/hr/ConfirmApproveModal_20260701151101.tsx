"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

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
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Та итгэлтэй байна уу?</DialogTitle>
          <DialogDescription>
            {" "}
            Чөлөөний хүсэлтийг зөвшөөрөхөөр зайлшгуй акшилтай хүсэлт нь
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default ConfirmApproveModal;
