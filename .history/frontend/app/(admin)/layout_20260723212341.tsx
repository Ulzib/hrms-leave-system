// app/(hr)/layout.tsx
import Navbar from "@/components/navbar/Navbar";
import RoleScan from "@/components/auth/RoleScan";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RoleScan allowedRole={["ADMIN"]}>
      <div className="min-h-screen flex flex-col w-full ">
        <Navbar />
        <main className="flex-1 w-full max-w-full justify-center items-center bg-muted ">
          {children}
        </main>
      </div>
    </RoleScan>
  );
};

export default AdminLayout;
