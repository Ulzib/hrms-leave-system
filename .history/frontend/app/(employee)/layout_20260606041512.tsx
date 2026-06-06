import Navbar from "@/components/navbar/Navbar";

const EmployeeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <main className="pt-28 flex items-center justify-center p-4 bg-gray-100">
        {children}
      </main>
    </div>
  );
};
export default EmployeeLayout;
