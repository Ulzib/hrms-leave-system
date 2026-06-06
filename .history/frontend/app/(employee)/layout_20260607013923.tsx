import Navbar from "@/components/navbar/Navbar";

const EmployeeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col w-full ">
      <Navbar />
      <main className="flex-1 w-full bg-gray-100 ">{children}</main>
    </div>
  );
};
export default EmployeeLayout;
