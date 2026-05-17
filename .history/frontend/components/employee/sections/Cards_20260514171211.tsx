import { Card, CardContent } from "@/components/ui/card";

interface LeaveBalance {
  totalDays: number;
  usedDays: number;
}

const remainingDays = balance? balance.totalDays - balance.usedDays : 0
const Cards = () => {
  return (
    <div className="flex gap-4">
      <Card className="">
        <CardContent>
          <p>Зайнаас ажиллах</p>
          <p>{remaining days} хоног</p>
          <p>боломжтой байна.</p>
        </CardContent>
      </Card>
    </div>
  );
};
export default Cards;
