import Navbar from "@/components/navbar/Navbar";

const EmployeeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex w-full max-w-full justify-center items-center bg-gray-100">
        {children}
      </main>
    </div>
  );
};
export default EmployeeLayout;
