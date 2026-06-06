import Navbar from "@/components/navbar/Navbar";

const EmployeeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <Navbar />
      <main className="min-h-screen bg-gray-100">{children}</main>
    </div>
  );
};
export default EmployeeLayout;
