interface FileUploadProps {
  file: File | null;
  onChange: (file: File | null) => void;
}

const FileUpload = ({ file, onChange }: FileUploadProps) => {};
export default FileUpload;
