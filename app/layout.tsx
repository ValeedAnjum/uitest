// app/layout.js
"use client";

import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { DM_Sans } from "next/font/google";

import theme from "../theme";

import { AdminDashboard } from "@/layouts";

const dm_sans = DM_Sans({
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={dm_sans.className}>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AdminDashboard>{children}</AdminDashboard>
        </ThemeProvider>
      </body>
    </html>
  );
}
