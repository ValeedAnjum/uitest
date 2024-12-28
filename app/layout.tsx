// app/layout.js
"use client";

import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";

import { AdminDashboard } from "@/layouts";
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AdminDashboard>{children}</AdminDashboard>
        </ThemeProvider>
      </body>
    </html>
  );
}
