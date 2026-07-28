"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";

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
      return;
    }

    let homePath = "/login";
    if (user.role === "ADMIN") {
      homePath = "/admin-dashboard";
    } else if (user.role === "HR") {
      homePath = "/leaves;";
    } else if (user.role === "EMPLOYEE") {
      homePath = "/employee-dashboard";
    }
    router.replace(homePath);
  }, [user, allowedRole, router]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!allowedRole.includes(user.role)) {
    <div className="flex min-h-screen items-center justify-center">
      <Spinner />
    </div>;
  }
  return <>{children}</>;
};
export default RoleScan;
