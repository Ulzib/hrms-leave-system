"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/lib/axios";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";
import BigPineIcon from "../svg/BigPineIcon";

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

const LoginForm = ({ className, ...props }: LoginFormProps) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //otp ilgeeh
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/send-otp", { email });
      sessionStorage.setItem("otp_email", email);
      toast.success("амжилттай", {
        description: "Нэг удаагийн кодыг таны имэйл рүү илгээлээ.",
      });
      router.push("/verify-otp");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Алдаа гарлаа");
      } else {
        setError("Алдаа гарлаа");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Spinner />
      </div>
    );
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold leading-7 tracking-normal dark:text-gray-200">
            Нэвтрэх
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <FieldGroup className="flex flex-col items-center">
              <BigPineIcon />
              <Field>
                <FieldLabel
                  htmlFor="email"
                  className="text-sm font-medium leading-5 tracking-normal dark:text-gray-200"
                >
                  Имэйл хаяг
                </FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>

              <Button
                onClick={handleSubmit}
                type="submit"
                disabled={loading}
                className="w-full py-5 px-4 gap-2 rounded-md"
              >
                {loading ? <Spinner /> : "Нэвтрэх"}
              </Button>
            </FieldGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default LoginForm;
