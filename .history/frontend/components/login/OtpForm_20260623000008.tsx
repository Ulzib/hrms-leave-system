"use client";

import { ArrowLeft, RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import api from "@/lib/axios";
import { Spinner } from "../ui/spinner";

const OtpForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //sessionStorage-s email avna
  const email = sessionStorage.getItem("otp_email") || "";

  //otp shalgh
  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/verify-otp", { email, otp });
      //AuthContext-d hadgalna
      login(res.data.token, res.data.user);

      if (res.data.user.role === "ADMIN") {
        router.push("/admin-dashboard");
      } else if (res.data.user.role === "HR") {
        router.push("/hr");
      } else {
        router.push("/employee-dashboard");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Алдаа гарлаа");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await api.post("auth/send-otp", { email });
      setError("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Алдаа гарлаа");
      }
    }
  };
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Нэвтрэх</CardTitle>
      </CardHeader>
      <CardContent>
        <Field>
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={handleResend}
            >
              <RefreshCwIcon />
              Дахин илгээх
            </Button>
          </div>
          <InputOTP
            maxLength={4}
            id="otp-verification"
            value={otp}
            onChange={(value) => setOtp(value)}
            required
          >
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl mx-auto">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <FieldDescription>{email} руу код илгээгдсэн</FieldDescription>
        </Field>
      </CardContent>
      <CardFooter>
        <Field>
          <Button
            type="button"
            className="w-full"
            disabled={loading || otp.length < 4}
            onClick={handleSubmit}
          >
            {loading ? <Spinner /> : "Баталгаажуулах"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
export default OtpForm;
