// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue
    },
    secondary: {
      main: "#dc004e", // Red
    },
  },
  typography: {
    fontFamily: "'DM Sans', Roboto, Arial, sans-serif",
  },
});

export default theme;
