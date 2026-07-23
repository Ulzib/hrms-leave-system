import { AuthProvider } from "../context/AuthContext";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="mn" className={cn("font-sans", inter.variable)}>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Toaster richColors position="top-center" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
