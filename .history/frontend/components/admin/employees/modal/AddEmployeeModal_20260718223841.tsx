import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddEmpModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddEmployeeModal = ({ open, onClose, onSuccess }: AddEmpModalProps) => {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Шинэ ажилтан бүртгэх</DialogTitle>
          <DialogDescription>
            Дараах формыг бөглөж шинэ ажилтны мэдээллийг оруулна уу.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default AddEmployeeModal;
