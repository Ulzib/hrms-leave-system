import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FileUploadProps {
  file: File | null;
  onChange: (file: File | null) => void;
}

const FileUpload = ({ onChange }: FileUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    onChange(selected);
  };
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-sm font-medium leading-3.5 tracking-normal">
        Хавсаргах материал (Заавал биш)
      </Label>
      <Input
        type="file"
        accept="image/*,.pdf"
        onChange={handleFileChange}
        className="text-sm"
      />
    </div>
  );
};
export default FileUpload;
