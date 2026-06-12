interface FileUploadProps {
  file: File | null;
  onChange: (file: File | null) => void;
}

const FileUpload = ({ onChange }: FileUploadProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium leading-3.5 tracking-normal">
        Хавсаргах материал (Заавал биш)
      </p>
    </div>
  );
};
export default FileUpload;
