// app/(hr)/layout.tsx
import Navbar from "@/components/navbar/Navbar";
import RoleScan from "@/components/RoleScan";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RoleScan allowedRole={["ADMIN"]}>
      <div>
        <Navbar />
        <main>{children}</main>
      </div>
    </RoleScan>
  );
};

export default AdminLayout;
