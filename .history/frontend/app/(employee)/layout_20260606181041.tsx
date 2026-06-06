import Navbar from "@/components/navbar/Navbar";

const EmployeeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed top-0 z-50 w-full">
      <Navbar />
      <main className="min-h-screen bg-gray-100">{children}</main>
    </div>
  );
};
export default EmployeeLayout;
