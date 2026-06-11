import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const RequestButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={router.push("/")}
      className="py-5 px-4 text-sm font-medium leading-5 hover:bg-gray-700"
    >
      + Чөлөө хүсэх
    </Button>
  );
};
export default RequestButton;
