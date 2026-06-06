import Navbar from "@/components/navbar/Navbar";

const EmployeeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="w-full flex items-center justify-center bg-gray-100 mx-auto">
        {children}
      </main>
    </div>
  );
};
export default EmployeeLayout;
