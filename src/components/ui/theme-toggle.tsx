"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Monitor, Palette, Check, Eye, Zap } from "lucide-react";

interface ThemeOption {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

const themes: ThemeOption[] = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
    description: "Clean and bright interface",
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
    description: "Easy on the eyes",
  },
  {
    value: "night",
    label: "Night Mode",
    icon: Eye,
    description: "Ultra dark for night time",
  },
  {
    value: "system",
    label: "System",
    icon: Monitor,
    description: "Use system preference",
  },
];

const colorThemes: ThemeOption[] = [
  {
    value: "theme-blue",
    label: "Blue",
    icon: Palette,
    description: "Calm and professional",
  },
  {
    value: "theme-green",
    label: "Green",
    icon: Palette,
    description: "Natural and fresh",
  },
  {
    value: "theme-purple",
    label: "Purple",
    icon: Palette,
    description: "Creative and vibrant",
  },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const currentTheme = themes.find((t) => t.value === theme) || themes[0];
  const Icon = currentTheme.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="gap-2">
          <Icon className="h-4 w-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-2">
          <p className="text-sm font-medium mb-2">Theme Mode</p>
          {themes.map((themeOption) => {
            const ThemeIcon = themeOption.icon;
            const isSelected = theme === themeOption.value;

            return (
              <DropdownMenuItem
                key={themeOption.value}
                onClick={() => setTheme(themeOption.value)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ThemeIcon className="h-4 w-4" />
                  <div>
                    <div className="font-medium">{themeOption.label}</div>
                    {themeOption.description && (
                      <div className="text-xs text-muted-foreground">
                        {themeOption.description}
                      </div>
                    )}
                  </div>
                </div>
                {isSelected && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            );
          })}
        </div>

        <DropdownMenuSeparator />

        <div className="p-2">
          <p className="text-sm font-medium mb-2">Color Themes</p>
          {colorThemes.map((colorTheme) => {
            const ColorIcon = colorTheme.icon;
            const isSelected = theme === colorTheme.value;

            return (
              <DropdownMenuItem
                key={colorTheme.value}
                onClick={() => setTheme(colorTheme.value)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ColorIcon className="h-4 w-4" />
                  <div>
                    <div className="font-medium">{colorTheme.label}</div>
                    {colorTheme.description && (
                      <div className="text-xs text-muted-foreground">
                        {colorTheme.description}
                      </div>
                    )}
                  </div>
                </div>
                {isSelected && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SimpleThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("night");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    switch (theme) {
      case "dark":
        return <Moon className="h-4 w-4" />;
      case "night":
        return <Eye className="h-4 w-4" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {getIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export function ThemeDemo() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {[...themes, ...colorThemes].map((themeOption) => {
        const ThemeIcon = themeOption.icon;
        const isSelected = theme === themeOption.value;

        return (
          <Button
            key={themeOption.value}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => setTheme(themeOption.value)}
            className="gap-2"
          >
            <ThemeIcon className="h-4 w-4" />
            {themeOption.label}
            {isSelected && <Zap className="h-3 w-3" />}
          </Button>
        );
      })}
    </div>
  );
}
