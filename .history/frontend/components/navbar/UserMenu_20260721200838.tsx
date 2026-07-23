import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Popover, PopoverTrigger } from "../ui/popover";
import Image from "next/image";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setOpen(false);
    logout();
    toast.success("Системээс гарлаа");
    router.push("/login");
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="cursor-pointer rounded-full">
          <Image src="/Avatar.png" alt="Avatar" width={36} height={36} />
        </button>
      </PopoverTrigger>
    </Popover>
  );
};
export default UserMenu;
