"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // next-themes san ni theme-g FOUC-güi tootsokh zorilgoor <script> tag
  // shuud oruuldag. Ene ni React 19-tei zörchildöj, konsold "Encountered
  // a script tag..." gedeg mash olon төслд мэдэгдсэн (харин функциональ
  // алдаа биш) console.error гаргадаг. next-themes сан удаан update
  // хийгдээгүй тул зөвхөн энэ тодорхой мессежийг л шүүнэ.
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args: unknown[]) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("Encountered a script tag while rendering")
      ) {
        return;
      }
      originalError(...args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
};
export default ThemeProvider;
