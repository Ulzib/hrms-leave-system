import Cards from "./sections/Cards";
import PickDate from "./sections/PickDate";

const DashboardEmp = () => {
  return (
    <>
      <Cards />
      <div className="flex flex-col gap-5">
        <h4 className="text-xl font-semibold leading-7 ">
          Миний явуулсан хүсэлтүүд
        </h4>
        <PickDate />
      </div>
    </>
  );
};
export default DashboardEmp;
