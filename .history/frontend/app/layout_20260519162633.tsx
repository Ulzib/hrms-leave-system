import { AuthProvider } from "../context/AuthContext";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="mn" className={cn("font-sans", inter.variable)}>
      <body>
        <AuthProvider>
          {children}
          <Toaster richColors position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
