interface RoleScanProps {
  allowedRole: string[];
  children: React.ReactNode;
}

const RoleScan = ({ allowedRole, children }: RoleScanProps) => {
  return <>{children}</>;
};
export default RoleScan;
