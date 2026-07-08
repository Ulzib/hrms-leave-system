"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface RoleScanProps {
  allowedRole: string[];
  children: React.ReactNode;
}

const RoleScan = ({ allowedRole, children }: RoleScanProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      router.replace("/login");
      return;
    }

    //authContext harahn localstorage-s unshagui bj blno, dahij hulene
    if (!user) {
      return;
    }

    if (allowedRole.includes(user.role)) {
      setChecking(false);
      return;
    }
  }, []);
  return <>{children}</>;
};
export default RoleScan;
