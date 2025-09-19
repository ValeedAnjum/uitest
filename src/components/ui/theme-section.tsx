"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ThemeToggle,
  SimpleThemeToggle,
  ThemeDemo,
} from "@/components/ui/theme-toggle";
import {
  Sun,
  Moon,
  Monitor,
  Palette,
  Eye,
  Sparkles,
  Settings,
  Zap,
  Heart,
  Star,
} from "lucide-react";

export function ThemeSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeDescriptions = {
    light: "Clean and bright interface perfect for daytime use",
    dark: "Easy on the eyes with dark backgrounds and light text",
    night:
      "Ultra-dark theme designed for nighttime viewing with minimal eye strain",
    "theme-blue": "Professional blue color scheme with calming tones",
    "theme-green": "Natural green palette inspired by nature",
    "theme-purple": "Creative purple theme with vibrant accents",
    system: "Automatically adapts to your device's system preference",
  };

  const getCurrentThemeInfo = () => {
    if (!mounted) return { name: "Loading...", description: "" };

    const themeNames = {
      light: "Light Mode",
      dark: "Dark Mode",
      night: "Night Mode",
      "theme-blue": "Blue Theme",
      "theme-green": "Green Theme",
      "theme-purple": "Purple Theme",
      system: "System Theme",
    };

    return {
      name: themeNames[theme as keyof typeof themeNames] || "Unknown Theme",
      description:
        themeDescriptions[theme as keyof typeof themeDescriptions] || "",
    };
  };

  const currentThemeInfo = getCurrentThemeInfo();

  if (!mounted) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Theme Controls
            </CardTitle>
            <CardDescription>Loading theme options...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Theme Control Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme Controls
          </CardTitle>
          <CardDescription>
            Switch between different themes and color schemes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Theme Display */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <h4 className="font-medium flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                Current Theme: {currentThemeInfo.name}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                {currentThemeInfo.description}
              </p>
            </div>
            <Badge variant="secondary" className="gap-2">
              <Zap className="h-3 w-3" />
              Active
            </Badge>
          </div>

          {/* Theme Toggle Options */}
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Theme Controls
              </h4>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Dropdown:
                  </span>
                  <ThemeToggle />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Quick Toggle:
                  </span>
                  <SimpleThemeToggle />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                All Available Themes
              </h4>
              <ThemeDemo />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theme Features Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Theme Features
          </CardTitle>
          <CardDescription>
            Advanced theming capabilities and options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">Basic Themes</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-yellow-500" />
                  <span>
                    <strong>Light Mode:</strong> Clean and bright interface
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Moon className="h-4 w-4 text-blue-500" />
                  <span>
                    <strong>Dark Mode:</strong> Easy on the eyes
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-purple-500" />
                  <span>
                    <strong>Night Mode:</strong> Ultra dark for nighttime
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-gray-500" />
                  <span>
                    <strong>System:</strong> Follows device preference
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Color Themes</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-blue-500 rounded-full"></div>
                  <span>
                    <strong>Blue:</strong> Professional and calming
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                  <span>
                    <strong>Green:</strong> Natural and fresh
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-purple-500 rounded-full"></div>
                  <span>
                    <strong>Purple:</strong> Creative and vibrant
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              Technical Features
            </h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>
                • CSS variables for consistent theming across all components
              </li>
              <li>• Automatic system preference detection</li>
              <li>• Smooth transitions between themes</li>
              <li>• Persistent theme selection in localStorage</li>
              <li>• Support for custom color schemes</li>
              <li>• Accessibility-friendly contrast ratios</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Live Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Live Theme Preview</CardTitle>
          <CardDescription>
            See how different components look in the current theme
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h5 className="font-medium">Buttons</h5>
              <div className="space-y-2">
                <Button size="sm" className="w-full">
                  Primary
                </Button>
                <Button variant="secondary" size="sm" className="w-full">
                  Secondary
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Outline
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-medium">Cards & Surfaces</h5>
              <div className="p-3 bg-card border rounded-md">
                <p className="text-sm text-card-foreground">Card content</p>
              </div>
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Muted surface</p>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-medium">Status Badges</h5>
              <div className="flex flex-wrap gap-1">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Error</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
