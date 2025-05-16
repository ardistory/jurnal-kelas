import { Moon, Sun } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { useTheme } from "./ThemeProvider.js";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <Button variant="outline" size="icon" onClick={() => (theme === 'dark') ? setTheme('light') : (theme === 'light') ? setTheme('dark') : null}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
    );
}
