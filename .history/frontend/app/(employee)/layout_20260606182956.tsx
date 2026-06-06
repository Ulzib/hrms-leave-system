import Navbar from "@/components/navbar/Navbar";

const EmployeeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <Navbar />
      <main className="flex items-center justify-center bg-gray-100">
        {children}
      </main>
    </div>
  );
};
export default EmployeeLayout;
