import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

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
      <PopoverContent align="end" className="w-48 p-2">
        <div className="flex flex-col gap-0.5 px-1.5 py-1">
          <p className="text-sm font-medium">{user?.username}</p>
          <p className="text-xs text-muted-foreground">{user?.role}</p>
        </div>
        <Separator className="my-0.5" />
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={handleLogout}
        >
          Гарах
        </Button>
      </PopoverContent>
    </Popover>
  );
};
export default UserMenu;
