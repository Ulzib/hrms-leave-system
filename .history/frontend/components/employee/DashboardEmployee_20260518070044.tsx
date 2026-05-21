import Cards from "./sections/Cards";
import PickDate from "./sections/PickDate";

const DashboardEmp = () => {
  return (
    <>
      <Cards />
      <div>
        <h4 className="text-xl font-semibold leading-7 ">
          Миний явуулсан хүсэлтүүд
        </h4>
        <PickDate />
      </div>
    </>
  );
};
export default DashboardEmp;
