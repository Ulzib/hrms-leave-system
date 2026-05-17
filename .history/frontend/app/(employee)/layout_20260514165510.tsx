import Navbar from "@/components/navbar/Navbar";

const EmployeeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="w-full h-full bg-gray-100">{children}</main>
    </div>
  );
};
export default EmployeeLayout;
