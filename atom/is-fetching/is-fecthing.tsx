"use client";

import { Box, alpha, useTheme, CircularProgress } from "@mui/material";
import { JSX } from "react";

interface IIsFetchingProps {
  isFetching: boolean;
  isFixed?: boolean;
}

export function IsFetching({ isFetching }: IIsFetchingProps): JSX.Element {
  const theme = useTheme();

  if (!isFetching) return <>{null}</>;

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: alpha(theme.palette.background.paper, 0.375),
        zIndex: 1111,
      }}
    >
      <Box
        sx={{
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          display: "inline-block",
        }}
      >
        <CircularProgress />
      </Box>
    </Box>
  );
}
