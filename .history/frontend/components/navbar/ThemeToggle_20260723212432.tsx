import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleToggle = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  if (!mounted) {
    return (
      <div className="size-9 rounded-full border border-[#E4E4E7]bg-white" />
    );
  }
  return (
    <button
      onClick={handleToggle}
      className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-border bg-background"
      aria-label="dark/light mode toggle"
    >
      {theme === "dark" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </button>
  );
};
export default ThemeToggle;
