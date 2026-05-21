import Cards from "./sections/Cards";
import PickDate from "./sections/PickDate";
import RequestButton from "./sections/RequestButton";
import RequestLists from "./sections/RequestLists";

const DashboardEmp = () => {
  return (
    <div className="flex flex-col gap-6">
      <Cards />
      <div className="flex flex-col gap-5 ">
        <h4 className="text-xl font-semibold leading-7 trackin-[-2.5%]">
          Миний явуулсан хүсэлтүүд
        </h4>
        <div className="flex justify-between">
          <PickDate />
          <RequestButton />
        </div>
      </div>
      <RequestLists />
    </div>
  );
};
export default DashboardEmp;
