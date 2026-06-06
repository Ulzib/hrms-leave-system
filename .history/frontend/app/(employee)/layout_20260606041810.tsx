import Navbar from "@/components/navbar/Navbar";

const EmployeeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" w-full bg-gray-100">
      <Navbar />
      <main className="pt-28 flex items-center  min-h-screen p-4 ">
        {children}
      </main>
    </div>
  );
};
export default EmployeeLayout;
