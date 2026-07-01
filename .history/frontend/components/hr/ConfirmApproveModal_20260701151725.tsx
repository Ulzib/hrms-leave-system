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
