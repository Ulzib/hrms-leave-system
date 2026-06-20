import PickDate from "../dashboard/comps/PickDate";

const LeaveCalendarMain = () => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-xl font-semibold leading-7 tracking-[-2.5%]">
        Чөлөө авсан:
      </h4>
      <div className="flex justify-between items-center">
        <PickDate />
      </div>
    </div>
  );
};
export default LeaveCalendarMain;
