import Navbar from "@/components/navbar/Navbar";

const HrLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default HrLayout;
