import Navbar from "@/components/navbar/Navbar";

const EmployeeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full max-w-full justify-center items-center bg-gray-100">
        {children}
      </main>
    </div>
  );
};
export default EmployeeLayout;
