interface FileUploadProps {
  file: File | null;
  onChange: (file: File | null) => void;
}

const FileUpload = ({ onChange }: FileUploadProps) => {
  return <div className="flex flex-col gap-2"></div>;
};
export default FileUpload;
