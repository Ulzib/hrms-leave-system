// app/(hr)/layout.tsx
import Navbar from "@/components/navbar/Navbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
