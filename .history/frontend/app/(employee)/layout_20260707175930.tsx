import Navbar from "@/components/navbar/Navbar";
import RoleScan from "@/components/RoleScan";

const EmployeeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RoleScan allowedRole={["EMPLOYEE", "HR", "ADMIN"]}>
      <div className="min-h-screen flex flex-col w-full ">
        <Navbar />
        <main className="flex-1 w-full max-w-full justify-center items-center bg-gray-100 ">
          {children}
        </main>
      </div>
    </RoleScan>
  );
};
export default EmployeeLayout;
