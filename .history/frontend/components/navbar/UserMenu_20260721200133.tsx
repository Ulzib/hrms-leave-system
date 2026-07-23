import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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
  return <div>hi</div>;
};
export default UserMenu;
