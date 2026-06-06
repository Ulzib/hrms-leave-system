import Navbar from "@/components/navbar/Navbar";

const EmployeeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="bg-gray-100 mx-auto">{children}</main>
    </div>
  );
};
export default EmployeeLayout;
