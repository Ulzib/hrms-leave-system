import OtpForm from "@/components/login/OtpForm";
const VerifyOtpPage = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted dark:bg-black p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <OtpForm />
      </div>
    </div>
  );
};
export default VerifyOtpPage;
