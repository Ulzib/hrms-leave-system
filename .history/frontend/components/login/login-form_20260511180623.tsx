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

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

const LoginForm = ({ className, ...props }: LoginFormProps) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //otp ilgeeh
  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError("");

    const email = FormData.get("email") as string;

    try {
      await api.post("/auth/send-otp", { email });
      sessionStorage.setItem("otp_email", email);
      router.push("/verify-otp");
    } catch (err: any) {
      setError(err.response?.data?.message || "aldaa garlaa");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    <div>
      <Spinner />
    </div>;
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl"> Нэвтрэх</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Имэйл</FieldLabel>
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

              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" disabled={loading}>
                {loading ? <Spinner /> : "Код илгээх"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default LoginForm;
