interface FileUploadProps {
  file: File | null;
  onChange: (file: File | null) => void;
}

const FileUpload = ({ onChange }: FileUploadProps) => {
  return <div>hi</div>;
};
export default FileUpload;
