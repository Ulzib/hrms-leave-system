import { Card, CardContent } from "@/components/ui/card";

const RequestCards = () => {
  return (
    <Card className="flex-1 shadow-sm">
      <p className="text-sm font-medium leading-5 px-6"></p>
      <CardContent className="px-6">
        <h4 className="text-xl font-semibold leading-7"></h4>
        <p className="text-xs font-normal leading-4 text-[#71717A]">
          боломжтой байна.
        </p>
      </CardContent>
    </Card>
  );
};
export default RequestCards;
